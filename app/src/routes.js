import {lazy} from "react";

const routes = [
    {
        path : "/",
        exact: true,
        component: lazy(() => import("./views/DashboardPage"))
    },
    {
        path : "/log",
        exact: true,
        component: lazy(() => import("./views/LogPage"))
    },
    {
        path : "/login",
        exact: true,
        component: lazy(() => import("./views/Login"))
    }
]

export default routes;
