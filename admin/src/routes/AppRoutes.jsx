import { createBrowserRouter } from "react-router-dom"
import RootLayout from "../layoutes/RootLayout"
import DashBoard from "../pages/DashBoard"
import OrdersPage from "../pages/OrdersPage"
import ProductsPage from "../pages/ProductsPage"
import UsersPage from "../pages/UsersPage"
import CategoriesPage from "../pages/CategoriesPage"
import CreateCategory from "../pages/CreateCategory"
import CreateUser from "../pages/CreateUser"
import CreateProduct from "../pages/CreateProduct"
import ErrorElement from "../pages/ErrorElement"
import SignOut from "../pages/SignOut"
import SignIn from "../pages/SignIn"
import Unauthorized from "../pages/Unauthorized"
import CheckAuth from "../componnents/ui/CheckAuth"
import OrderDetailsPage from "../pages/orderDetailsPage/OrderDetailsPage"


const router = createBrowserRouter([
    {
        path: "/", element: (
            <CheckAuth allowedRole={["admin"]}>
                <RootLayout />
            </CheckAuth>
        ),
        errorElement: <ErrorElement />,
        children: [
            { path: "", element: <DashBoard /> },
            { path: "orders", element: <OrdersPage /> },
            { path: "products", element: <ProductsPage /> },
            { path: "users", element: <UsersPage /> },
            { path: "categories", element: <CategoriesPage /> },
            { path: "create-category", element: <CreateCategory /> },
            { path: "create-user", element: <CreateUser /> },
            { path: "create-product", element: <CreateProduct /> },
            { path: "create-category", element: <CreateCategory /> },
            { path: "order-details/:orderId", element: <OrderDetailsPage /> },
        ]
    },
    { path: "/sign-out", element: <SignOut /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/unauthorized", element: <Unauthorized /> },
])

export default router