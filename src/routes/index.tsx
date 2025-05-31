import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { navigationMenuItem } from "@/contents";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: navigationMenuItem?.map((item) => ({
            path: item.path,
            element: item.element,
        }))

    }
])

export default router;