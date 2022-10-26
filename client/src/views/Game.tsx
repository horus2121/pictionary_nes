import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActionCable from "actioncable";

import { Canvas } from "../components/Canvas";
import { Channel } from "../components/Channel";
import { ScoreBoard } from "../components/ScoreBoard";
import { WordGenerator } from "../components/WordGenerator";

export const Game = () => {
    const currentLobby = useParams()
    const [message, setMessage] = useState('')

    const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

    const handleConnection = (handlers: any) => {

        const params = {
            channel: "LobbyChannel",
            lobby_id: currentLobby
        }

        const sub = cable.subscriptions.create(params, handlers)

        return sub

    }

    useEffect(() => {

        const handlers = {
            connected() {
                console.log("Connected to Lobby", currentLobby)
            },

            disconnected() {
                console.log("Disconnected from Lobby", currentLobby)
            },

            received(data: any) {
                console.log(data)
                setMessage(data.message)
            }
        }

        const sub = handleConnection(handlers)

        return () => {
            console.log("Unsubbing from Lobby", currentLobby)
            sub.unsubscribe()
        }

    }, [currentLobby, message])

    const handleUpstream = (upstream: any) => {

        const messageSendingHandlers = {
            connected() {
                sub.send({ message: upstream })
            },

            disconnected() {
            },

            received() {
            }
        }

        const sub = handleConnection(messageSendingHandlers)

    }
    return (
        <div className='grid grid-cols-7 gap-3'>
            <WordGenerator />
            <Canvas handleUpstream={handleUpstream} />
            <ScoreBoard />
            <Channel handleUpstream={handleUpstream} />
        </div>
    );
}