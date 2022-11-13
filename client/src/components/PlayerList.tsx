import { useEffect } from "react"
import { useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"

export const PlayerList = (props: any) => {

    const { currentLobbyUsers, setCurrentLobbyUsers } = props
    const lobby = useAppSelector((state: RootState) => state.lobbies)

    useEffect(() => {

        if (!lobby.id) return
        fetch('/lobbies/' + lobby.id)
            .then(res => res.json())
            .then(json => {
                setCurrentLobbyUsers(json.lobby.users)
            })
            .catch(err => console.log(err))

    })

    return (
        <div className="lists absolute left-10 top-80">
            <ul className="nes-list is-circle">
                {currentLobbyUsers && currentLobbyUsers.map((user: any) => {
                    return <li key={user.id}>{user.username}</li>
                })}
            </ul>
        </div>
    )
}