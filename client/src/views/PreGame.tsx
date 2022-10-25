import { useState } from "react"

export const PreGame = () => {
    const [onNewLobby, setOnNewLobby] = useState(true)
    const [mode, setMode] = useState('')

    const handleModeSelection = (e: any) => {
        setMode(e.target.value)
    }

    return (
        <div className='grid grid-cols-3 m-5 absolute'>
            <span className="nes-text col-start-2 row-start-1">Pictionary</span>
            <span className="nes-text col-start-2 row-start-2">Hi Username!</span>

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
                <div className="nes-container lists col-start-2 row-start-4">
                    <span className="nes-text col-start-2 row-start-2">Lobby List:</span>
                    <ul className="nes-list is-circle">
                        <li>Lobby 1</li>
                        <li>Lobby 2</li>
                        <li>Lobby 3</li>
                        <li>Lobby 4</li>
                    </ul>
                </div>
                :
                <div className="col-start-2 row-start-5">

                    <div className="nes-field">
                        <label htmlFor="name_field">Lobby Title</label>
                        <input type="text" id="name_field" className="nes-input" />
                    </div>

                    <div className="nes-field">
                        <label htmlFor="name_field">Description</label>
                        <input type="text" id="name_field" className="nes-input" />
                    </div>

                    <label htmlFor="default_select">Select Mode</label>
                    <div className="nes-select">
                        <select required id="default_select" defaultValue="" onChange={handleModeSelection} >
                            <option value="" disabled hidden>Select...</option>
                            <option value="public" >Public</option>
                            <option value="private" >Private</option>
                        </select>
                    </div>

                    <div className="nes-field">
                        <label htmlFor="name_field">Password</label>
                        <input type="text" id="name_field" className="nes-input" />
                    </div>
                </div>
            }

            <div className="grid grid-cols-2 col-start-2 row-start-6 mt-5">
                <a href="/ingame" className="col-start-1">
                    <button type="button" className="nes-btn is-primary">Create Lobby</button>
                </a>

                <a href="/" className="col-start-2">
                    <button type="button" className="nes-btn is-error">Quit Game</button>
                </a>
            </div>

        </div>
    )
}