import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../features/HomePage";
import AboutPage from "../features/AboutPage";
import ContactPage from "../features/ContactPage";
import CatalogPage from "../features/catalog/CatalogPage";
import ProductDeatilsPage from "../features/catalog/ProductDetails";
import ErrorPage from "../features/ErrorPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ShoppingCartPage from "../features/cart/ShoppingCartPage";
import LoginPage from "../features/account/loginPage";
import RegisterPage from "../features/account/registerPage";
import CheckoutPage from "../features/checkout/CheckoutPage";
import AuthGuard from "./AuthGuard";
import OrderList from "../features/orders/OrderList";

{/*
    What is React Router?
    React Router is a standard library for managing navigation and routing in a React application.
    It enables you to create single-page applications (SPAs) with navigation functionality by rendering components based on the URL path without needing a full page reload.

    In simple terms, React Router allows you to:
    1- Define routes (URLs) in your application.
    2- Load specific components or pages when users navigate to those routes.
    3- Manage navigation, like going back, forward, or programmatically changing routes.
*/}

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children:
                [

                    {
                        element: <AuthGuard />, children: [
                            { path: "checkout", element: <CheckoutPage /> },
                            { path: "orders", element: <OrderList /> },
                        ]
                    },

                    { path: "", element: <HomePage /> },
                    { path: "about", element: <AboutPage /> },
                    { path: "contact", element: <ContactPage /> },
                    { path: "catalog", element: <CatalogPage /> },
                    { path: "catalog/:id", element: <ProductDeatilsPage /> },
                    { path: "cart", element: <ShoppingCartPage /> },
                    { path: "login", element: <LoginPage /> },
                    { path: "register", element: <RegisterPage /> },
                    { path: "error", element: <ErrorPage /> },
                    { path: "server-error", element: <ServerError /> },
                    { path: "not-found", element: <NotFound /> },
                    { path: "*", element: <NotFound /> },
                ]
        }

    ]
)