import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { CreateLobby, EnterLobby } from "../features/lobbiesSlice"
import { LogoutUser } from "../features/usersSlice"

export const PreGame = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const lobbyID = useAppSelector((state: RootState) => state.lobbies.id)
    const [id, setID] = useState<number | null>(null)
    const [lobbyList, setLobbyList] = useState([])

    const [onNewLobby, setOnNewLobby] = useState(true)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [password, setPassword] = useState('')
    const [mode, setMode] = useState('')

    useEffect(() => {

        fetch('/lobbies')
            .then(res => res.json())
            .then(json => setLobbyList(json.lobbies))
            .catch(error => console.log(error))

    }, [lobbyList])

    useEffect(() => {
        if (lobbyID !== null && lobbyID !== id)
            setID(lobbyID)

        if (id !== null) {
            navigate('/lobbies/' + id)
            setID(null)
        }
    }, [lobbyID, id])

    const handleCreateLobby = () => {

        const lobby = {
            title: title,
            description: description,
            password: password,
            mode: mode
        }
        setTitle('')
        setDescription('')
        setPassword('')
        setMode('')

        if (document.querySelectorAll('input')) {
            document.querySelectorAll('input').forEach((input) => input.value = '')
        }

        dispatch(CreateLobby(lobby))
    }

    const handleLobbySelection = (e: any) => {
        dispatch(EnterLobby(e.target.value))
        setID(null)
    }

    const handleQuitGame = () => {
        dispatch(LogoutUser())
    }

    return (
        <div className='grid grid-cols-3 m-5 absolute'>
            <span className="nes-text col-start-2 row-start-1">Pictionary</span>

            <div className="col-start-2 row-start-3">
                <label htmlFor="on_new_lobby">Create a new lobby?</label>
                <label>
                    <input type="radio" className="nes-radio" name="answer" checked={onNewLobby} onChange={() => setOnNewLobby(true)} />
                    <span>Yes</span>
                </label>

                <label>
                    <input type="radio" className="nes-radio" name="answer" checked={!onNewLobby} onChange={() => setOnNewLobby(false)} />
                    <span>No</span>
                </label>
            </div>

            {!onNewLobby ?
                <div className="nes-container lists col-start-2 row-start-4 h-80 overflow-scroll">
                    <span className="nes-text col-start-2 row-start-2">Lobby List:</span>
                    <ul className="nes-list is-circle">
                        {
                            lobbyList && lobbyList.map((lobby: any) =>
                                <li key={lobby.id} value={lobby.id} onClick={handleLobbySelection}>Lobby {lobby.id}</li>)
                        }
                    </ul>
                </div>
                :
                <div className="col-start-2 row-start-5">

                    <div className="nes-field">
                        <label htmlFor="title">Lobby Title</label>
                        <input type="text" id="title" className="nes-input" onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="nes-field">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" className="nes-input" onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <label htmlFor="mode">Select Mode</label>
                    <div className="nes-select">
                        <select required id="mode" defaultValue="" onChange={(e) => setMode(e.target.value)} >
                            <option value="" disabled hidden>Select...</option>
                            <option value="public" >Public</option>
                            <option value="private" >Private</option>
                        </select>
                    </div>

                    {(mode === "private") &&
                        <div className="nes-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" className="nes-input" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    }
                </div>

            }

            <div className="grid grid-cols-2 col-start-2 row-start-6 mt-5">
                <button type="button" className="nes-btn is-primary" onClick={handleCreateLobby}>Create Lobby</button>

                <button type="button" className="nes-btn is-error" onClick={handleQuitGame}>Quit Game</button>
            </div>

        </div>
    )
}