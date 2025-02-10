import { createBrowserRouter } from "react-router";
import App from "../components/App";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CatalogPage from "../pages/catalog/CatalogPage";
import ProductDeatilsPage from "../pages/catalog/ProductDetails";
import ErrorPage from "../pages/ErrorPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";

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
                    { path: "*", element: <NotFound /> },
                    { path: "", element: <HomePage /> },
                    { path: "about", element: <AboutPage /> },
                    { path: "contact", element: <ContactPage /> },
                    { path: "catalog", element: <CatalogPage /> },
                    { path: "catalog/:id", element: <ProductDeatilsPage /> },
                    { path: "error", element: <ErrorPage /> },
                    { path: "server-error", element: <ServerError /> },
                    { path: "not-found", element: <NotFound /> },
                ]
        }

    ]
)