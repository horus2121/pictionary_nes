export const ScoreBoard = (props: any) => {

    const { scoreboardRef } = props

    return (
        <div className="with-title is-centered col-start-7 row-start-2 mr-5">
            <p ref={scoreboardRef} className="title">Score Board</p>

            {/* {currentLobbyUsers && currentLobbyUsers.map((user: any) => {

                let score

                if (scores.some((user_score: any) => user_score.username === user.username ? true : false)) {
                    score = scores.find((user_score: any) => user_score.username === user.username).score
                } else {
                    score = 0
                }

                return (
                    <>
                        <label htmlFor={user.id}>
                            <span className="nes-text is-success">{user.username}</span>
                        </label>
                        <progress className="nes-progress" id={user.id} key={user.id} value={score} max="100"></progress>
                    </>
                )
            })} */}
        </div>
    )
}