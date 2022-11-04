import { Outlet } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"

import { Footer } from "../components/Footer"
import { Nav } from "../components/Nav"

export const Layout = () => {
    const user = useAppSelector((state: RootState) => state.users)

    return (
        <>
            <span className="nes-text is-error fixed right-3 top-3">{user.username}</span>
            <Nav />

            <Outlet />

            <Footer />
        </>
    )
}