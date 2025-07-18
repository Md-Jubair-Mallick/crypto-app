import type { FC } from "react"
import {
  Button,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem
} from "../ui"
import { Link } from "react-router-dom"
import { navigationMenuItem as navItem } from "@/contents"

const Navbar: FC = () => {
  return (
    <Sidebar >
      <SidebarContent className="bg-deepblue">
        <SidebarMenu className="p-2 pt-20">
          {navItem?.filter(item=> item?.label !== 'CryptoDetails').map((item) => (
            <SidebarMenuItem key={item.label} >
              {/* <SidebarMenuButton asChild isActive className="bg-transparent" variant={'outline'}> */}
              <Button variant="ghost" asChild className="w-full flex justify-start text-white">
                <Link
                  className=""
                  to={item.path}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </Button>
              {/* </SidebarMenuButton> */}

            </SidebarMenuItem>
          ))}

        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default Navbar
