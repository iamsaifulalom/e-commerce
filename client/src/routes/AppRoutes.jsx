import { createBrowserRouter, Navigate } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ErrorPage from "../compnents/globalComponents/ErrorPage";
import CartPage from "../pages/CartPage";
import CategoriesPage from "../pages/CategoriesPage";
import ProductDetails from "../pages/ProductDetalsPage";
import BrowsByCategoriesPage from "../pages/BrowsByCategoriesPage";
import CheckOutPage from "../pages/CheckOutPage";
import OrderList from "../pages/OrderList";
import OrderDetails from "../pages/OrderDetails";
import SignIn from "../pages/SignIn";
import ContactUs from "../pages/ContactUs";
import DeliveryPolicy from "../pages/DeliveryPolicy";
import PrivecyPolicy from "../pages/PrivecyPolicy";

const router = createBrowserRouter([
    {
        path: "/", element: <ClientLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <Home /> },
            { path: "shop", element: <Shop /> },
            { path: "cart", element: <CartPage /> },
            { path: "categories", element: <CategoriesPage /> },
            { path: "categories/:id", element: <BrowsByCategoriesPage /> },
            { path: "product-details/:id", element: <ProductDetails /> },
            { path: "check-out", element: <CheckOutPage /> },
            { path: "orders", element: <OrderList /> },
            { path: "contact-us", element: <ContactUs /> },
            { path: "delivery-policy", element: <DeliveryPolicy /> },
            { path: "privery-policy", element: <PrivecyPolicy /> },
            { path: "order/:orderId", element: <OrderDetails /> },
        ]
    },
    { path: "/sign-in", element: <SignIn /> },

])

export default router
