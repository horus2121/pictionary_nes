
export const Login = () => {

    return (
        <div className='grid grid-cols-3 m-5 absolute top-1/4'>
            <span className="nes-text col-start-2 row-start-1">Pictionary</span>

            <span className="nes-text col-start-2 row-start-1">Pictionary</span>
            <div className="col-start-2 row-start-2">
                <div className="nes-field">
                    <label htmlFor="name_field">Username</label>
                    <input type="text" id="name_field" className="nes-input" />
                </div>
                <div className="nes-field">
                    <label htmlFor="name_field">Password</label>
                    <input type="text" id="name_field" className="nes-input" />
                </div>

            </div>

            <div className="grid grid-cols-2 col-start-2 row-start-4 mt-5">
                <a href="/pregame" className="col-start-1">
                    <button type="button" className="nes-btn is-primary">Start Game</button>
                </a>

                <a href="/signup" className="col-start-2">
                    <button type="button" className="nes-btn is-success">Sign Up</button>
                </a>
            </div>
        </div>
    )
}