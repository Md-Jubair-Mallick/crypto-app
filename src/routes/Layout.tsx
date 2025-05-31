import { Header, Navbar } from "@/components/custom"
import { SidebarProvider } from "@/components/ui"
import type { FC } from "react"
import { Outlet } from "react-router-dom"

const Layout: FC = () => {
    return (
        <div className="">
            <SidebarProvider className="">
                <Navbar />
                <div className="w-full">
                    <Header />
                    <main className="">
                        <Outlet />
                    </main>
                    <footer className="py-20 w-full bg-deepblue text-center text-lightblue">© 2025 My Company</footer>
                </div>
            </SidebarProvider>
        </div>

    )
}

export default Layout
