import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Canvas } from "../components/Canvas";
import { Channel } from "../components/Channel";
import { ScoreBoard } from "../components/ScoreBoard";
import { WordGenerator } from "../components/WordGenerator";
import { PlayerList } from "../components/PlayerList";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { lobbyChannel } from "../channels/lobby_channel";

export const Game = () => {
    const navigate = useNavigate()
    const currentLobby = useParams()
    const [canvasPath, setCanvasPath] = useState({})
    const [receivedCanvasPath, setReceivedCanvasPath] = useState({})
    const [receivedMessage, setReceivedMessage] = useState('')
    const lobby = useAppSelector((state: RootState) => state.lobbies)
    const user = useAppSelector((state: RootState) => state.users)

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
                } else {
                    console.log(data)
                }
            }
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
            <WordGenerator />
            <Canvas handleUpstream={handleSendCanvasPath} receivedCanvasPath={receivedCanvasPath} />
            <ScoreBoard />
            <Channel handleUpstream={handleSendMessage} receivedMessage={receivedMessage} />
        </div>
    );
}