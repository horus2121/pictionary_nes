export const ScoreBoard = (props: any) => {

    const { currentLobbyUsers, scores } = props

    return (
        <div className="with-title is-centered col-start-7 row-start-2 mr-5">
            <p className="title">Score Board</p>
            <progress className="nes-progress" value="10" max="100"></progress>
            <progress className="nes-progress is-primary" value="10" max="100"></progress>
            <progress className="nes-progress is-success" value="10" max="100"></progress>
            <progress className="nes-progress is-warning" value="30" max="100"></progress>
            <progress className="nes-progress is-error" value="10" max="100"></progress>
            <progress className="nes-progress is-pattern" value="50" max="100"></progress>
            {currentLobbyUsers && currentLobbyUsers.map((user: any) => {

                let score

                if (scores.some((user_score: any) => user_score.username === user.username ? true : false)) {
                    score = scores.find((user_score: any) => user_score.username === user.username).score
                } else {
                    score = 0
                }

                return <progress className="nes-progress" key={user.id} value={score} max="100">{user.username}</progress>
            })}
        </div>
    )
}