export const Nav = () => {
    return (
        <div className="fixed left-0 grid ml-5 mt-5">

            <a href="/" className="nes-badge is-icon">
                <span className=""></span>
                <span className="is-primary">Home</span>
            </a>

            <a href="/" className="nes-badge is-icon">
                <span className=""></span>
                <span className="is-success">Category</span>
            </a>

            <a href="/" className="nes-badge is-icon">
                <span className=""></span>
                <span className="is-warning">Hi</span>
            </a>

            <a href="/" className="nes-badge is-icon">
                <span className=""></span>
                <span className="is-error">Hello</span>
            </a>

            <a href="/" className="nes-badge is-icon">
                <span className=""></span>
                <span className="is-dark">Quit</span>
            </a>
        </div>
    )
}