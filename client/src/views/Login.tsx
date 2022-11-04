import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { loginUser } from "../features/usersSlice";

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const user = useAppSelector((state: RootState) => state.users)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {

        if (user.isLoggedIn) {
            navigate('/pregame')
        }

    }, [user, navigate])

    const handleStartGame = () => {

        let user = { username: username, password: password }
        setUsername("")
        setPassword("")

        dispatch(loginUser(user))
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    return (
        <div className='grid grid-cols-3 m-5 absolute top-1/4'>
            <span className="nes-text col-start-2 row-start-1">Pictionary</span>

            <span className="nes-text col-start-2 row-start-1">Pictionary</span>
            <div className="col-start-2 row-start-2">
                <div className="nes-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" className="nes-input" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="nes-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="nes-input" onChange={(e) => setPassword(e.target.value)} />
                </div>

            </div>

            <div className="grid grid-cols-2 col-start-2 row-start-4 mt-5">
                <button type="button" className="nes-btn is-primary" onClick={handleStartGame}>Start Game</button>
                <button type="button" className="nes-btn is-success" onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
    )
}