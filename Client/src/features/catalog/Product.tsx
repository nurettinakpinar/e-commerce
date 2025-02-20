import { AddShoppingCart, Search } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Link } from "react-router";
import { IProduct } from "../../models/IProduct";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../cart/cartSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";

interface Props {
    product: IProduct
}

export default function Product({ product }: Props) {

    const { status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

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
                <LoadingButton variant="outlined" size="small" color="success" startIcon={<AddShoppingCart />}
                    onClick={() => dispatch(addItemToCart({ productId: product.id }))} loading={status === "pendingAddItem" + product.id}>Sepete Ekle</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" startIcon={<Search />} size="small">İncele</Button>
            </CardActions>
        </Card>
    );
}