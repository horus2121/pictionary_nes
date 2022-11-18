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
    const currentLobby = useParams()
    const lobby = useAppSelector((state: RootState) => state.lobbies)
    const user = useAppSelector((state: RootState) => state.users)
    const [receivedCanvasPath, setReceivedCanvasPath] = useState({})
    const [receivedMessage, setReceivedMessage] = useState<any>([])

    const [gameOn, setGameOn] = useState(false)
    const [currentDrawer, setCurrentDrawer] = useState('')
    const [drawOn, setDrawOn] = useState(false)
    const [isLobbyOwner, setIsLobbyOwner] = useState(false)

    const [word, setWord] = useState('')
    const [currentLobbyUsers, setCurrentLobbyUsers] = useState<any>([])
    const [scores, setScores] = useState<any>([])

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
                    // if (receivedMessage.length < 21) {
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
                    } else {
                        newMessage.innerHTML = data.sender + ": " + data.message
                    }
                    chatList.appendChild(newMessage)

                    if (chatList.children.length > 100) {
                        chatList.firstChild.remove()
                    }
                    // <p className="text-sm">me: {message.message}</p>
                } else if (data.canvas_path) {
                    setReceivedCanvasPath(data.canvas_path)
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
                    setScores([])
                } else if (data.game_status === 2) {
                    setWord('')
                    const showResult = async () => {
                        let resultBuf = "Final Result: \n"

                        const calculteResult = async () => {

                            currentLobbyUsers && currentLobbyUsers.forEach((user: any) => {
                                let score

                                if (scores.some((user_score: any) => user_score.username === user.username ? true : false)) {
                                    score = scores.find((user_score: any) => user_score.username === user.username).score
                                } else {
                                    score = 0
                                }

                                resultBuf = resultBuf + `${user.username}: ${score} \n`

                            })

                            return resultBuf
                        }

                        const finalResult = await calculteResult()

                        if (finalResult != "Final Result: \n") {
                            console.log(finalResult)
                        }

                    }

                    showResult()
                } else if (data.word) {
                    setWord(data.word)
                } else if (data.scored_player) {

                    const updatedScores = () => {
                        if (scores.length === 0) {
                            return [...scores, { username: data.scored_player, score: 10 }]
                        } else {
                            return scores.map((user: any) => user.username === data.scored_player ? { ...user, score: user.score + 10 } : user)
                        }
                    }

                    setScores(updatedScores)
                } else if (data.command) {
                    if (data.command === 1) {
                        if (!canvasRef.current) return
                        const canvas: any = canvasRef.current

                        canvas.resetCanvas()
                    }
                } else {
                    console.log(data)
                }
            },

        }
    }

    const handleSendMessage = (message: string) => {

        const sub = lobbyChannel(channelProps)

        if (gameOn && message === word) {
            sub.send({ scored_player: user.username })
        } else {
            sub.send({ message: message, sender: user.username })
        }

    }

    const handleSendCanvasPath = (canvasPath: any) => {

        const sub = lobbyChannel(channelProps)
        sub.send({ canvas_path: canvasPath })

    }

    const handleStartGame = () => {

        const sub = lobbyChannel(channelProps)
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

        const sub = lobbyChannel(channelProps)

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

    const bin = () => {
        if (!canvasRef.current) return
        const canvas: any = canvasRef.current

        canvas.resetCanvas()

        const sub = lobbyChannel(channelProps)
        sub.send({ command: 1 })
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
                receivedCanvasPath={receivedCanvasPath}
                setReceivedCanvasPath={setReceivedCanvasPath}
                handleStartGame={handleStartGame}
                bin={bin}
                gameOn={gameOn} />
            <ScoreBoard
                scores={scores}
                currentLobbyUsers={currentLobbyUsers} />
            {!gameOn && isLobbyOwner &&
                <button className="absolute top-1/3 left-1/2 nes-text is-error" onClick={handleStartGame}>Start</button>
            }
            <Channel
                chatListRef={chatListRef}
                handleUpstream={handleSendMessage}
                receivedMessage={receivedMessage} />
        </div>
    );
}