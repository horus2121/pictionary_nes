import { useEffect, useState } from "react";
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
    const [receivedMessage, setReceivedMessage] = useState('')
    const lobby = useAppSelector((state: RootState) => state.lobbies)
    const user = useAppSelector((state: RootState) => state.users)

    const [gameOn, setGameOn] = useState(false)
    const [currentDrawer, setCurrentDrawer] = useState(0)
    const [drawOn, setDrawOn] = useState(false)
    const [isLobbyOwner, setIsLobbyOwner] = useState(false)

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
                    setReceivedMessage(data.message)
                } else if (data.canvasPath) {
                    setReceivedCanvasPath(data.canvasPath)
                } else if (data.game_status === 1) {
                    setGameOn(true)
                    setCurrentDrawer(data.current_drawer)
                } else if (data.game_status === 0) {
                    alert("Game is in process...")
                    dispatch(QuitLobby(lobby.id))
                } else if (data.game_status === 2) {
                    setGameOn(false)
                }
                else {
                    console.log(data)
                }
            },

        }
    }

    const handleSendMessage = (message: string) => {

        const sub = lobbyChannel(channelProps)
        sub.send({ message: message })

    }

    const handleSendCanvasPath = (canvasPath: any) => {

        const sub = lobbyChannel(channelProps)
        sub.send({ canvasPath: canvasPath })

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
        console.log(currentDrawer)

    }, [user, currentDrawer])

    useEffect(() => {

        if (user.id === lobby.userID) {
            setIsLobbyOwner(true)
        } else {
            setIsLobbyOwner(false)
        }

    }, [user, lobby])

    // const handleConnection = (handlers: any) => {

    //     const params = {
    //         channel: "LobbyChannel",
    //         lobby_id: currentLobby,
    //         user_id: 1
    //     }

    //     const sub = cable.subscriptions.create(params, handlers)

    //     return sub

    // }

    // const handleUpstream = (upstream: any) => {

    //     console.log("send message...")
    //     const messageSendingHandlers = {
    //         connected() {
    //             sub.send({ message: upstream })
    //         },

    //         disconnected() {
    //         },

    //         received() {
    //         }
    //     }

    //     const sub = handleConnection(messageSendingHandlers)

    // }

    // useEffect(() => {

    //     const handlers = {
    //         connected() {
    //             console.log("Connected to Lobby", currentLobby)
    //         },

    //         disconnected() {
    //             console.log("Disconnected from Lobby", currentLobby)
    //         },

    //         received(data: any) {
    //             console.log(data)
    //             setMessage(data.message)
    //         }
    //     }

    //     const sub = handleConnection(handlers)

    //     return () => {
    //         console.log("Unsubbing from Lobby", currentLobby)
    //         sub.unsubscribe()
    //     }

    // }, [currentLobby, message])


    return (
        <div className='grid grid-cols-7 gap-3'>
            <PlayerList />
            <WordGenerator
                currentDrawer={currentDrawer}
                gameOn={gameOn} />
            <Canvas
                drawOn={drawOn}
                handleUpstream={handleSendCanvasPath}
                receivedCanvasPath={receivedCanvasPath}
                handleStartGame={handleStartGame}
                gameOn={gameOn} />
            <ScoreBoard />
            {!gameOn && isLobbyOwner &&
                <button className="absolute top-1/3 left-1/2 nes-text is-error" onClick={handleStartGame}>Start</button>
            }
            <Channel
                handleUpstream={handleSendMessage}
                receivedMessage={receivedMessage} />
        </div>
    );
}