import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

export const AuthUsers = () => {
    const user = useAppSelector((state: RootState) => state.users)
    const location = useLocation()

    return (
        user.isLoggedIn
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}