import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { quitLobby } from "../features/lobbiesSlice"
import { logoutUser } from "../features/usersSlice"

export const Nav = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const lobbyID = useAppSelector((state: RootState) => state.lobbies.id)

    // useEffect(() => {
    //     if (!lobbyID) navigate('/')
    // })

    const handleQuitGame = () => {
        dispatch(quitLobby())
        dispatch(logoutUser())
        navigate('/')
    }

    return (
        <div className="fixed left-0 grid ml-5 mt-5">

            <div className="nes-badge is-icon">
                <span className=""></span>
                <span className="is-primary">Home</span>
            </div>

            <div className="nes-badge is-icon">
                <span className=""></span>
                <span className="is-success">Category</span>
            </div>

            <div className="nes-badge is-icon">
                <span className=""></span>
                <span className="is-warning">Hi</span>
            </div>

            <div className="nes-badge is-icon">
                <span className=""></span>
                <span className="is-error">Hello</span>
            </div>

            <div className="nes-badge is-icon">
                <span className=""></span>
                <span className="is-dark" onClick={handleQuitGame}>Quit</span>
            </div>
        </div>
    )
}