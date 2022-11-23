import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Canvas } from "../components/Canvas";
import { Channel } from "../components/Channel";
import { ScoreBoard } from "../components/ScoreBoard";
import { WordGenerator } from "../components/WordGenerator";
import { PlayerList } from "../components/PlayerList";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { lobbyChannel } from "../channels/lobby_channel";
import { QuitLobby } from "../features/lobbiesSlice";

export const Game = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const canvasRef = useRef(null)
    const chatListRef = useRef<any>(null)
    const chatInputRef = useRef<any>(null)
    const scoreboardRef = useRef<any>(null)
    const currentLobby = useParams()
    const lobby = useAppSelector((state: RootState) => state.lobbies)
    const user = useAppSelector((state: RootState) => state.users)

    const [sub, setSub] = useState<any>(null)
    const [receivedMessage, setReceivedMessage] = useState<any>([])
    const [gameOn, setGameOn] = useState(false)
    const [currentDrawer, setCurrentDrawer] = useState('')
    const [drawOn, setDrawOn] = useState(false)
    const [isLobbyOwner, setIsLobbyOwner] = useState(false)
    const [word, setWord] = useState('')
    const [currentLobbyUsers, setCurrentLobbyUsers] = useState<any>([])

    const timerRef = useRef<any>(null)
    const [timer, setTimer] = useState<any>('00:00:00')

    const channelProps = {
        lobbyParams: {
            channel: "LobbyChannel",
            lobby_id: currentLobby,
            user_id: user.id
        },
        handlers: {
            connected() {
                console.log("Connected to ", currentLobby)
            },

            disconnected() {
                console.log("Disconnected from ", currentLobby)
            },

            received(data: any) {

                if (data.message || data.message === '') {
                    // if (receivedMessage.length < 101) {
                    //     setReceivedMessage([...receivedMessage, data])
                    // } else {
                    //     setReceivedMessage([...receivedMessage.slice(1, 21), data])
                    // }
                    setReceivedMessage(data)
                    if (!chatListRef) return
                    const chatList = chatListRef.current

                    const newMessage = document.createElement('p')
                    if (data.sender === user.username) {
                        newMessage.innerHTML = "me: " + data.message
                        // <p className="text-sm">me: {data.message}</p>
                    } else if (data.sender === "System") {
                        newMessage.innerHTML = data.sender + ": " + data.message
                        newMessage.className = "nes-text is-error"
                    } else {
                        newMessage.innerHTML = data.sender + ": " + data.message
                        // <p className="text-sm">{data.username}: {data.message}</p>
                    }
                    chatList.appendChild(newMessage)

                    if (chatList.children.length > 100) {
                        chatList.firstChild.remove()
                    }
                } else if (data.canvas_path) {
                    // setReceivedCanvasPath(data.canvas_path)
                    if (!canvasRef.current) return
                    const canvas: any = canvasRef.current

                    canvas.loadPaths(data.canvas_path)
                } else if (data.game_status === 1) {
                    setGameOn(true)
                    setCurrentDrawer(data.current_drawer)
                } else if (data.game_status === 0) {
                    alert("Game is in process...")
                    dispatch(QuitLobby(lobby.id))
                } else if (data.game_status === 4) {
                    alert("The lobby has reached its capacity...")
                    dispatch(QuitLobby(lobby.id))
                } else if (data.game_status === 3) {
                    setGameOn(false)

                    const progresses = document.querySelectorAll("progress")
                    progresses && progresses.forEach((progress: any) => {
                        progress.className = progress.className.replace("is-scored", "")
                        progress.value = 0
                    })
                } else if (data.game_status === 2) {
                    setWord('')

                    // const result = currentLobbyUsers && currentLobbyUsers.reduce((prev: any, curr: any) => {

                    //     console.log(curr)
                    //     const progress: any = document.querySelector(`#progress${curr.id}`)
                    //     if (!progress) return
                    //     const score = progress.value

                    //     const resultTem = prev + `${curr.username}: ${score} \n`

                    //     return resultTem
                    // }, 'Final Result: \n')
                    // console.log(result)

                    let result = "Final Result: \n"

                    const progresses = document.querySelectorAll("progress")
                    progresses && progresses.forEach((progress: any) => {
                        result = result + progress.innerHTML + ": " + progress.value + " \n"
                    })

                    alert(result)
                } else if (data.word) {
                    setWord(data.word)
                } else if (data.scored_player) {
                    if (data.scored_player.username === data.drawer) return

                    const progress: any = document.querySelector(`#progress${data.scored_player.id}`)
                    if (progress && !progress.className.includes("is-scored")) {
                        progress.value = progress.value + 10
                        progress.className = progress.className + " is-scored"
                    }
                    // console.log(data)
                    // const updatedScores = () => {
                    //     if (scores.length === 0) {
                    //         return [...scores, { username: data.scored_player, score: 10 }]
                    //     } else {
                    //         return scores.map((user: any) => user.username === data.scored_player ? { ...user, score: user.score + 10 } : user)
                    //     }
                    // }
                    // console.log(updatedScores())

                    // setScores(updatedScores())
                } else if (data.command) {
                    if (data.command === 1) {
                        if (!canvasRef.current) return
                        const canvas: any = canvasRef.current

                        canvas.resetCanvas()
                    }
                } else if (data.timer === 0) {
                    timerReset()
                } else {
                    console.log(data)
                }
            },

        }
    }

    const handleSendMessage = (message: string) => {

        if (gameOn && message === word) {
            sub.send({ scored_player: { username: user.username, id: user.id }, drawer: currentDrawer })
        } else {
            sub.send({ message: message, sender: user.username })
        }

        if (chatInputRef) {
            chatInputRef.current.value = ''
        }
    }

    const handleSendCanvasPath = (canvasPath: any) => {

        sub.send({ canvas_path: canvasPath })

    }

    const handleStartGame = () => {

        sub.perform("game_loop")

    }

    // const lobbyChannel = (channelProps: any) => {
    //     if (!cable.current) {
    //         // cable.current = actioncable.createConsumer('wss://dry-fjord-28793.herokuapp.com/cable')
    //         cable.current = actioncable.createConsumer('ws://127.0.0.1:3000/cable')
    //     }

    //     const createLobbyChannel = (channelProps: any) => {
    //         return cable.current.subscriptions.create(channelProps.lobbyParams, channelProps.handlers)
    //     }

    //     const lobbyChannel = createLobbyChannel(channelProps)

    //     return lobbyChannel
    // }

    useEffect(() => {

        setSub(lobbyChannel(channelProps))

        if (!lobby.id) {
            sub.unsubscribe()
            navigate('/pregame')
        }

        return () => {
            if (!lobby.id) {
                sub.unsubscribe()
            }
        }
    }, [lobby])

    useEffect(() => {

        if (!scoreboardRef) return
        const scoreboard = scoreboardRef.current

        if (scoreboard.children.length < currentLobbyUsers.length) {
            currentLobbyUsers && currentLobbyUsers.forEach((user: any) => {

                const newDiv = document.createElement('div')
                const newLable = document.createElement('lable')
                const newSpan = document.createElement('span')
                const newProgress = document.createElement('progress')

                newSpan.innerHTML = user.username
                newSpan.className = "nes-text is-success"

                // <progress className="nes-progress" id={user.id} key={user.id} value={score} max="100"></progress>
                newProgress.className = "nes-progress"
                newProgress.id = `progress${user.id}`
                newProgress.value = 0
                newProgress.max = 100
                newProgress.innerHTML = user.username

                newLable.appendChild(newSpan)
                newDiv.appendChild(newLable)
                newDiv.appendChild(newProgress)
                scoreboard.appendChild(newDiv)

            })
        } else if (scoreboard.children.length > currentLobbyUsers.length) {
            scoreboard.firstChild.remove()
        }

    }, [currentLobbyUsers])

    useEffect(() => {

        if (user.username === currentDrawer) {
            setDrawOn(true)
        } else {
            setDrawOn(false)
        }

    }, [user, currentDrawer])

    useEffect(() => {

        if (!lobby.id) return
        fetch('/lobbies/' + lobby.id)
            .then(res => res.json())
            .then(json => {
                if (user.id === json.lobby.user_id) {
                    setIsLobbyOwner(true)
                } else {
                    setIsLobbyOwner(false)
                }
            })
            .catch(err => console.log(err))


    }, [user, lobby, currentLobbyUsers])

    useEffect(() => {

        const progresses = document.querySelectorAll("progress")
        progresses && progresses.forEach((progress: any) => {
            progress.className = progress.className.replace("is-scored", "")
        })

    }, [currentDrawer])

    const bin = () => {
        if (!canvasRef.current) return
        const canvas: any = canvasRef.current

        canvas.resetCanvas()

        sub.send({ command: 1 })
    }

    const getTimeRemaining = (e: any) => {
        const currentTime: any = new Date()
        const total = Date.parse(e) - Date.parse(currentTime);

        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);

        return { total, hours, minutes, seconds }
    }


    const startTimer = (e: any) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e)
        if (total >= 0) {

            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }


    const clearTimer = (e: any) => {

        setTimer('00:00:30');

        if (timerRef.current) clearInterval(timerRef.current);
        const id = setInterval(() => { startTimer(e) }, 1000)
        timerRef.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        deadline.setSeconds(deadline.getSeconds() + 30);
        return deadline;
    }

    const timerReset = () => {
        clearTimer(getDeadTime());
    }

    return (
        <div className='grid grid-cols-7 gap-3'>
            <PlayerList
                currentLobbyUsers={currentLobbyUsers}
                setCurrentLobbyUsers={setCurrentLobbyUsers} />
            <WordGenerator
                word={word}
                setWord={setWord}
                currentDrawer={currentDrawer}
                drawOn={drawOn}
                gameOn={gameOn} />
            <Canvas
                canvasRef={canvasRef}
                drawOn={drawOn}
                handleUpstream={handleSendCanvasPath}
                bin={bin}
                gameOn={gameOn} />
            <ScoreBoard
                scoreboardRef={scoreboardRef}
                currentLobbyUsers={currentLobbyUsers} />
            {
                gameOn ?
                    <p className="absolute top-5 right-40 nes-text is-error">{timer}</p>
                    : <></>
            }
            {gameOn ?
                <></>
                : isLobbyOwner ?
                    <div className="absolute top-1/3 left-1/2">
                        <i className="nes-ash" ></i>
                        <p className="nes-text is-error cursor-pointer" onClick={handleStartGame}>Start!</p>
                    </div>
                    // <button className="absolute top-5 left-40 nes-text is-error" onClick={handleStartGame}>Start</button>
                    : <p className="absolute top-1/3 left-1/3 nes-text is-error">Waiting owner to start the game...</p>
            }
            <Channel
                chatListRef={chatListRef}
                chatInputRef={chatInputRef}
                handleUpstream={handleSendMessage}
                receivedMessage={receivedMessage} />
        </div>
    );
}