import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { QuitLobby } from "../features/lobbiesSlice"
import { LogoutUser } from "../features/usersSlice"

export const Nav = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const lobbyID = useAppSelector((state: RootState) => state.lobbies.id)

    const handleHome = () => {
        navigate('/')
        if (lobbyID) {
            dispatch(QuitLobby(lobbyID))
        }
        dispatch(LogoutUser())
    }

    const handleProfile = () => {
        navigate('/me')
    }

    const handleLobby = () => {
        if (lobbyID) {
            dispatch(QuitLobby(lobbyID))
        }
        navigate('/pregame')
    }

    const handleQuitGame = () => {
        navigate('/')
        if (lobbyID) {
            dispatch(QuitLobby(lobbyID))
        }
        dispatch(LogoutUser())
    }

    return (
        <div className="fixed left-0 grid ml-5 mt-5">

            <div className="nes-badge is-icon cursot-pointer">
                <span className=""></span>
                <span className="is-primary" onClick={handleHome}>Home</span>
            </div>

            {/* <div className="nes-badge is-icon cursot-pointer">
                <span className=""></span>
                <span className="is-success">Category</span>
            </div> */}

            {/* <div className="nes-badge is-icon cursot-pointer">
                <span className=""></span>
                <span className="is-warning" onClick={handleProfile}>Porfile</span>
            </div> */}

            <div className="nes-badge is-icon cursot-pointer">
                <span className=""></span>
                <span className="is-success" onClick={handleLobby}>Lobby</span>
            </div>

            <div className="nes-badge is-icon cursot-pointer">
                <span className=""></span>
                <span className="is-warning" onClick={handleQuitGame}>Quit</span>
            </div>
        </div>
    )
}