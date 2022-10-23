import { useEffect, useState } from "react"
import ActionCable, { createConsumer } from "actioncable"
import { lobbyChannel } from "../channels/lobby_channel"

const consumer = ActionCable.createConsumer("ws://localhost:3000/cable")

export const Lobby = () => {
    const [lobbies, setLobbies] = useState([])
    const [currentLobby, setCurrentLobby] = useState(null)
    const [message, setMessage] = useState('')

    useEffect(() => {

        fetch('/lobbies')
            .then(res => res.json())
            .then(json => setLobbies(json.lobbies))
            .catch(error => console.log(error))

    }, [lobbies])

    useEffect(() => {

        const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

        const params = {
            channel: "LobbyChannel",
            lobby_id: currentLobby
        }

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

        const sub = cable.subscriptions.create(params, handlers)

        sub.send("something")

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

    return (
        <>
            <button onClick={handleCreateLobby}>Create Lobby</button>
            <div>
                {lobbies.map((lobby: any) =>
                    <button key={lobby.id} value={lobby.id} onClick={handleEnterLobby}> Lobby {lobby.id} </button>)
                }
            </div>
            <p>Message from server: {message}</p>
        </>
    )
}