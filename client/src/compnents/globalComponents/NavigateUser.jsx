import { Navigate, useLocation } from "react-router-dom"

const flateToNested = {
    "/profile" : "/more",
    "/orders" : "/more/orders",
    "/about-us" : "/more/about-us",
}

export default function NavigateUser({ children }) {
    const { pathname } = useLocation()
    const width = window.innerWidth;
    const shouldRedirect = Object.keys(flateToNested).includes(pathname)
    const redirect = width > 450 && shouldRedirect

    if (redirect){
        return <Navigate to={flateToNested[pathname]}/>
    }

    return children
}
