import { useEffect, useState } from "react"
import { useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"

export const PlayerList = () => {
    const lobby = useAppSelector((state: RootState) => state.lobbies)
    const [users, setUsers] = useState([])

    useEffect(() => {

        if (!lobby.id) return
        fetch('/lobbies/' + lobby.id)
            .then(res => res.json())
            .then(json => {
                console.log("json", json.lobby.users)
                setUsers(json.lobby.users)
            })
            .catch(err => console.log(err))

    })

    return (
        <div className="lists absolute left-10 top-80">
            <ul className="nes-list is-circle">
                {users && users.map((user: any) => {
                    return <li key={user.id}>{user.username}</li>
                })}
            </ul>
        </div>
    )
}