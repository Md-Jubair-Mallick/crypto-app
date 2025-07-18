import { CryptoCurrencies, CryptoDetails, Exchanges, Home, News } from "@/pages";
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
        label: 'Cryptocurrencies',
        path: '/cryptocurrencies',
        element: <CryptoCurrencies />,
        icon: <CircleDollarSign />
    },
    {
        label: 'CryptoDetails',
        path: '/crypto/:id',
        element: <CryptoDetails />,
        icon: null
    },
    {
        label: 'News',
        path: '/news',
        element: <News />,
        icon: <Newspaper />,
    }
]