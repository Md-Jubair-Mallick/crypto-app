import type { FC } from "react"
import { Avatar, AvatarFallback, AvatarImage, SidebarTrigger } from "../ui"

const Header: FC = () => {
    return (
        <header className="bg-blue-950 text-blue-400 font-semibold flex items-center gap-5 h-20 px-5 text-3xl">
            <SidebarTrigger className="text-white" />
            <Avatar>
                <AvatarImage src="./assets/images/cryptocurrency.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>Cryptoverse</span>
        </header>
    )
}

export default Header
