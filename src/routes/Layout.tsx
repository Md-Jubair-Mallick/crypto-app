import { Navbar } from "@/components/custom"
import type { FC } from "react"
import { Outlet } from "react-router-dom"

const Layout: FC = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>© 2025 My Company</footer>
        </div>
    )
}

export default Layout
