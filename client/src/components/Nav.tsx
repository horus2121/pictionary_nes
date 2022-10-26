import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../app/hooks"
import { quitLobby } from "../features/lobbiesSlice"

export const Nav = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleQuitGame = () => {
        dispatch(quitLobby)
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