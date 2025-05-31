import { CryptoCurrencies, CryptoDetails, Exchanges, Home, News } from "@/pages";
import type { navigationMenuItem as type} from "@/types";


export const navigationMenuItem: type[] = [
    {
        label: 'Home',
        path: '/',
        element: <Home />
    },
    {
        label: 'Exchanges',
        path: '/exchanges',
        element: <Exchanges />

    },
    {
        label: 'CryptoCurrencies',
        path: '/cryptoCurrencies',
        element: <CryptoCurrencies />

    },
    {
        label: 'CryptoDetails',
        path: '/crypto/:coinId',
        element: <CryptoDetails />
    },
    {
        label: 'News',
        path: '/news',
        element: <News />
    }
]