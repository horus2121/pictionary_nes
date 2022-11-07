import { useEffect } from "react"
import { useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"

export const PlayerList = () => {
    const lobby = useAppSelector((state: RootState) => state.lobbies)

    useEffect(() => {

        if (!lobby.id) return
        fetch('/lobbies/' + lobby.id)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))

    }, [lobby])

    return (
        <></>
    )
}