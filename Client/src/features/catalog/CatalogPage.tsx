import { useEffect } from "react";
import ProductList from "./ProductList";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProducts, productSelector } from "./catalogSlice";

export default function CatalogPage() {

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
    const { status, isLoaded } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();
    const products = useAppSelector(productSelector.selectAll)
    useEffect(() => {
        if (!isLoaded) {
            dispatch(fetchProducts());
        }
    }, [isLoaded]);

    if (status === "pendingFetchProducts")
        return (<CircularProgress />);

    return (
        <ProductList products={products} />
    );
}