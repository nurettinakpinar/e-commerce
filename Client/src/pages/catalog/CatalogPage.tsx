import { useState, useEffect } from "react";
import { IProduct } from "../../models/IProduct";
import ProductList from "./ProductList";
import { CircularProgress } from "@mui/material";
import requests from "../../api/requests";

export default function CatalogPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    {/*
        useEffect(() => {

        // What is CORS?
        // CORS (Cross-Origin Resource Sharing) allows this React frontend to communicate with the API.
        // The backend must explicitly permit requests from 'http://localhost:3000' in Program.cs for this to work.
        fetch("http://localhost:5298/api/products")
            .then(Response => Response.json())
            .then(data => setProducts(data)).
            catch(error => console.log(error))
            .finally(() => setLoading(false));

        }, []);
        */}

    useEffect(() => {

        requests.Catalog.list()
            .then(data => setProducts(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));

    }, []);

    if (loading)
        return (<CircularProgress />);

    return (
        <ProductList products={products} />
    );
}