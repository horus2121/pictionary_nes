import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    return (
        <div className='grid grid-cols-3 m-5 absolute top-1/4'>
            <div className="nes-text grid grid-cols-5 col-start-2 row-start-1">
                <span className="nes-text col-start-2 text-xl font-bold">Hey there!</span>
                <i className="nes-octocat animate col-start-3"></i>
            </div>

            <div className="grid grid-cols-2 col-start-2 row-start-4 mt-5">
                <button type="button" className="nes-btn is-primary" onClick={handleLogin}>Log In</button>
                <button type="button" className="nes-btn is-success" onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
    )
}