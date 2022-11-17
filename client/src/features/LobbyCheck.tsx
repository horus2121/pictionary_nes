import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

export const LobbyCheck = () => {
    const lobby = useAppSelector((state: RootState) => state.lobbies)
    const location = useLocation()

    return (
        lobby.id
            ? <Outlet />
            : <Navigate to="/pregame" state={{ from: location }} replace />
    )
}