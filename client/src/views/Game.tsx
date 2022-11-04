import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActionCable from "actioncable";

import { Canvas } from "../components/Canvas";
import { Channel } from "../components/Channel";
import { ScoreBoard } from "../components/ScoreBoard";
import { WordGenerator } from "../components/WordGenerator";
import { PlayerList } from "../components/PlayerList";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

export const Game = () => {
    const navigate = useNavigate()
    const currentLobby = useParams()
    const [message, setMessage] = useState('')
    const lobby = useAppSelector((state: RootState) => state.lobbies)

    useEffect(() => {

        if (!lobby.id) {
            navigate('/pregame')
        }

    }, [lobby])

    const handleConnection = (handlers: any) => {

        const params = {
            channel: "LobbyChannel",
            lobby_id: currentLobby,
            user_id: 1
        }

        const sub = cable.subscriptions.create(params, handlers)

        return sub

    }

    const handleUpstream = (upstream: any) => {

        console.log("send message...")
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


    return (
        <div className='grid grid-cols-7 gap-3'>
            {/* <PlayerList /> */}
            <WordGenerator />
            <Canvas handleUpstream={handleUpstream} />
            <ScoreBoard />
            <Channel handleUpstream={handleUpstream} />
        </div>
    );
}