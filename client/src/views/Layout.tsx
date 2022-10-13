import { Outlet } from "react-router-dom"

import { Footer } from "../components/Footer"
import { Nav } from "../components/Nav"

export const Layout = () => {
    return (
        <>
            <Nav />

            <Outlet />

            <Footer />
        </>
    )
}