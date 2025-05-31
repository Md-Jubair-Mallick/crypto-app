import { CryptoCurrencies, Exchanges, Home, News } from "@/pages";
import type { navigationMenuItem as type} from "@/types";
import { CircleDollarSign, HandCoins, HomeIcon, Newspaper } from "lucide-react";


export const navigationMenuItem: type[] = [
    {
        label: 'Home',
        path: '/',
        element: <Home />,
        icon: <HomeIcon />
    },
    {
        label: 'Exchanges',
        path: '/exchanges',
        element: <Exchanges />,
        icon: <HandCoins />
    },
    {
        label: 'CryptoCurrencies',
        path: '/cryptoCurrencies',
        element: <CryptoCurrencies />,
        icon: <CircleDollarSign />
    },
    {
        label: 'News',
        path: '/news',
        element: <News />,
        icon: <Newspaper />,
    }
]