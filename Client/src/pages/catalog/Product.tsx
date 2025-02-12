import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../models/IProduct";
import { AddShoppingCart, Search } from "@mui/icons-material";
import { Link } from "react-router";
import { useState } from "react";
import requests from "../../api/requests";
import { LoadingButton } from "@mui/lab";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { currencyTRY } from "../../utils/formatCurrency";

interface Props {
    product: IProduct
}

export default function Product({ product }: Props) {

    const [loading, setLoading] = useState(false);
    const { setCart } = useCartContext();

    function handleAddItem(productId: number) {
        setLoading(true);
        requests.Cart.addItem(productId).then(cart => {
                    setCart(cart);
                    toast.success("Ürün Sepetinize Eklendi");
                }).catch(error => console.log(error)).finally(() => setLoading(false));
    }

    return (
        <Card variant="outlined">
            <CardMedia sx={{ height: 250, backgroundSize: "contain" }} image={`http://localhost:5298/images/${product.imageUrl}`} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" color="text-secondary">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="secondary">
                    {currencyTRY.format(product.price)}
                </Typography>
            </CardContent>

            <CardActions >
                <LoadingButton variant="outlined" size="small" color="success" startIcon={<AddShoppingCart />} onClick={() => handleAddItem(product.id)} loading={loading}>Sepete Ekle</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" startIcon={<Search />} size="small">İncele</Button>
            </CardActions>
        </Card>
    );
}