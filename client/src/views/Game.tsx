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
    const currentLobby = useParams()
    const [receivedCanvasPath, setReceivedCanvasPath] = useState({})
    const [receivedMessage, setReceivedMessage] = useState<any>([])
    const [messageSender, setMessageSender] = useState('')
    const [ownMessage, setOwnMessage] = useState('')
    const lobby = useAppSelector((state: RootState) => state.lobbies)
    const user = useAppSelector((state: RootState) => state.users)

    const [gameOn, setGameOn] = useState(false)
    const [currentDrawer, setCurrentDrawer] = useState(0)
    const [drawOn, setDrawOn] = useState(false)
    const [isLobbyOwner, setIsLobbyOwner] = useState(false)

    const [word, setWord] = useState('')
    const [currentLobbyUsers, setCurrentLobbyUsers] = useState([])
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

                if (data.message) {
                    // if (data.sender == user.username) {
                    //     setOwnMessage(data.message)
                    // } else {
                    //     setMessageSender(data.sender)
                    //     setReceivedMessage(data.message)
                    // }
                    console.log(data)
                    console.log(receivedMessage)
                    console.log([...receivedMessage, data])
                    if (receivedMessage.length < 20) {
                        setReceivedMessage([...receivedMessage, data])
                    } else {
                        setReceivedMessage([...receivedMessage.slice(1, 21), data])
                    }
                } else if (data.canvas_path) {
                    setReceivedCanvasPath(data.canvas_path)
                } else if (data.game_status === 1) {
                    setGameOn(true)
                    setCurrentDrawer(data.current_drawer)
                } else if (data.game_status === 0) {
                    alert("Game is in process...")
                    dispatch(QuitLobby(lobby.id))
                } else if (data.game_status === 2) {
                    setGameOn(false)
                    setScores([])
                    setWord('')
                } else if (data.word) {
                    setWord(data.word)
                } else if (data.scored_player) {

                    const updatedScores = () => {
                        // if (scores.some((user: any) => user.username === data.scored_player ? true : false)) {
                        //     return scores.map((user: any) => user.username === data.scored_player ? { ...user, score: user.score + 10 } : user)
                        // } else {
                        //     return [...scores, { username: data.scored_player, score: 10 }]
                        // }
                        if (scores.length === 0) {
                            return [...scores, { username: data.scored_player, score: 10 }]
                        } else {
                            return scores.map((user: any) => user.username === data.scored_player ? { ...user, score: user.score + 10 } : user)
                        }
                    }

                    setScores(updatedScores)
                } else {
                    console.log(data)
                }
            },

        }
    }

    const handleSendMessage = (message: string) => {

        const sub = lobbyChannel(channelProps)

        if (gameOn && message == word) {
            sub.send({ scored_player: user.id })
        } else {
            sub.send({ message: message, sender: user.id })
        }

    }

    const handleSendCanvasPath = (canvasPath: any) => {

        const sub = lobbyChannel(channelProps)
        sub.send({ canvas_path: canvasPath })

    }

    const handleStartGame = () => {

        const sub = lobbyChannel(channelProps)
        sub.perform("game_start")

    }

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

        if (user.id === currentDrawer) {
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
                drawOn={drawOn}
                handleUpstream={handleSendCanvasPath}
                receivedCanvasPath={receivedCanvasPath}
                setReceivedCanvasPath={setReceivedCanvasPath}
                handleStartGame={handleStartGame}
                gameOn={gameOn} />
            <ScoreBoard
                scores={scores}
                currentLobbyUsers={currentLobbyUsers} />
            {!gameOn && isLobbyOwner &&
                <button className="absolute top-1/3 left-1/2 nes-text is-error" onClick={handleStartGame}>Start</button>
            }
            <Channel
                handleUpstream={handleSendMessage}
                ownMessage={ownMessage}
                messageSender={messageSender}
                receivedMessage={receivedMessage} />
        </div>
    );
}