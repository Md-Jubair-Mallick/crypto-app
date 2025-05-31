import type { FC } from "react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui"
import { Link } from "react-router-dom"
import { navigationMenuItem as navItem } from "@/contents"


const Navbar: FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItem?.map((item) => (
          <NavigationMenuItem>
            <NavigationMenuLink>
              <Link
                className="flex items-center justify-center gap-2"
                to={item.path}
              >
                {item.icon}
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navbar
