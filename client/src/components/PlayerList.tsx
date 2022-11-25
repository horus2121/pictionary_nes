import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"

export const PlayerList = (props: any) => {

    const location = useLocation()
    const { setCurrentLobbyUsers } = props
    const lobby = useAppSelector((state: RootState) => state.lobbies)

    useEffect(() => {

        if (lobby.id && location.pathname === `/lobbies/${lobby.id}`) {
            fetch('/lobbies/' + lobby.id)
                .then(res => res.json())
                .then(json => {
                    setCurrentLobbyUsers(json.lobby.users)
                })
                .catch(err => console.log(err))
        }

    })


    return (
        <div className="lists absolute left-10 top-80">
            {/* <ul className="nes-list is-circle">
                {currentLobbyUsers && currentLobbyUsers.map((user: any) => {
                    return <li key={user.id}>{user.username}</li>
                })}
            </ul> */}
        </div>
    )
}