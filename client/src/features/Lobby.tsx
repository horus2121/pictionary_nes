import { useEffect, useState } from "react"
import ActionCable from "actioncable"
import { lobbyChannel } from "../channels/lobby_channel"

export const Lobby = () => {
    const [lobbies, setLobbies] = useState([])
    const [currentLobby, setCurrentLobby] = useState(null)
    const [message, setMessage] = useState('')
    const [upstream, setUpstream] = useState('')

    const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

    useEffect(() => {

        fetch('/lobbies')
            .then(res => res.json())
            .then(json => setLobbies(json.lobbies))
            .catch(error => console.log(error))

    }, [lobbies])

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

    const handleCreateLobby = () => {
        fetch('/lobbies',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: "LOBBY 1",
                    description: "WELCOMe",
                    mode: "RANDOM",
                    link_code: "urisuexhcvh",
                    password: "123456"
                })
            })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(error => console.log(error))
    }

    const handleEnterLobby = (e: any) => {
        console.log(e.target.value)

        fetch('/lobbies/' + e.target.value)
            .then(res => res.json())
            .then(json => setCurrentLobby(json.lobby.id))
            .catch(error => console.log(error))

    }

    const handleClick = () => {

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
        <>
            <button onClick={handleCreateLobby}>Create Lobby</button>
            <div>
                {lobbies.map((lobby: any) =>
                    <button key={lobby.id} value={lobby.id} onClick={handleEnterLobby}> Lobby {lobby.id} </button>)
                }
            </div>
            <p>Message from server: {message}</p>
            <input type="text" onChange={(e) => setUpstream(e.target.value)} />
            <button onClick={handleClick}>Send</button>
        </>
    )
}