import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"

import { SignUpUser } from "../features/usersSlice"

export const SignUp = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector((state: RootState) => state.users)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    // useEffect(() => {

    //     if (user.isLoggedIn) {
    //         navigate('/pregame')
    //     }
    // }, [user, navigate])

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const user = {
            username: username,
            password: password,
            password_confirmation: passwordConfirmation
        }
        setUsername("")
        setPassword("")
        setPasswordConfirmation("")

        if (document.querySelectorAll('input')) {
            document.querySelectorAll('input').forEach((input) => input.value = '')
        }

        dispatch(SignUpUser(user))
        navigate('/login')
    }

    const handleGoBack = () => {
        navigate('/')
    }

    return (
        <div className='grid grid-cols-3 m-5 absolute top-1/4'>
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
                <div className="nes-field">
                    <label htmlFor="password_confirmation">Password Confirmation</label>
                    <input type="password" id="password_confirmation" className="nes-input" onChange={(e) => setPasswordConfirmation(e.target.value)} />
                </div>
            </div>

            <div className="grid grid-cols-2 col-start-2 row-start-4 mt-5">
                <button type="button" className="nes-btn is-primary" onClick={handleSubmit}>Sign Up</button>

                <button type="button" className="nes-btn is-error" onClick={handleGoBack}>Go Back</button>
            </div>
        </div>
    )
}