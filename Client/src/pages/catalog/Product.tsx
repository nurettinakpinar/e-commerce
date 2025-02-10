import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../models/IProduct";
import { AddShoppingCart, Search } from "@mui/icons-material";
import { Link } from "react-router";

interface Props {
    product: IProduct
}

export default function Product({ product }: Props) {
    return (
        <Card variant="outlined">
            <CardMedia sx={{ height: 250, backgroundSize: "contain" }} image={`http://localhost:5298/images/${product.imageUrl}`} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" color="text-secondary">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="secondary">
                    {product.price.toFixed(2)} ₺ 
                </Typography>
            </CardContent>

            <CardActions >
                <Button variant="outlined" startIcon={<AddShoppingCart />} color="success" size="small">Sepete Ekle</Button>
                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" startIcon={<Search/>} size="small">İncele</Button>
            </CardActions>
        </Card>
    );
}