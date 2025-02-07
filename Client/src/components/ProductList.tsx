import { IProduct } from "../models/IProduct";
import Product from "./Product";

interface Props {
    products: IProduct[],
    addProduct: () => void;
}

export default function ProductList({products, addProduct}: Props) {

    return (
        <>
            <h2>product Listesi</h2>
            {
                products.map((p: IProduct) => (
                    <Product key={p.id} product={p}></Product>
                ))
            }

            <button onClick={addProduct}> Add product </button>
        </>
    );
}