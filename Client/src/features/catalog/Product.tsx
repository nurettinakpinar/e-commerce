import { AddShoppingCart, Favorite, Star } from "@mui/icons-material";
import { 
    Card, 
    CardMedia, 
    CardContent, 
    Typography, 
    CardActions, 
    Button, 
    Box, 
    Chip, 
    IconButton,
    Stack,
    Rating
} from "@mui/material";
import { Link } from "react-router";
import { IProduct } from "../../models/IProduct";
import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "../../utils/favorites";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../cart/cartSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";

interface Props {
    product: IProduct
}

export default function Product({ product }: Props) {

    const { status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const [fav, setFav] = useState(false);

    useEffect(() => {
        setFav(isFavorite(product.id));
    }, [product.id]);

    // Mock rating for display purposes
    const rating = 4.5 + Math.random() * 0.5;

    return (
        <Card 
            sx={{ 
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                }
            }}
        >
            <Box sx={{ position: "relative" }}>
                <Box component={Link} to={`/catalog/${product.id}`} sx={{ display: "block", cursor: "pointer" }}>
                    <CardMedia 
                        sx={{ 
                            height: 280, 
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }} 
                        image={`http://localhost:5298/images/${product.imageUrl}`} 
                    />
                </Box>
                <Chip
                    label="Yeni"
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        backgroundColor: "#D4AF37",
                        color: "black",
                        fontWeight: 600,
                        fontSize: "0.75rem"
                    }}
                />
                <IconButton
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const nowFav = toggleFavorite(product.id);
                        setFav(nowFav);
                    }}
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 1)"
                        }
                    }}
                >
                    <Favorite sx={{ color: fav ? "#D4AF37" : "#9e9e9e" }} />
                </IconButton>
            </Box>
            
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                        fontWeight: 600,
                        mb: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}
                >
                    {product.name}
                </Typography>
                
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <Rating 
                        value={rating} 
                        precision={0.1} 
                        size="small" 
                        readOnly
                        sx={{
                            "& .MuiRating-iconFilled": {
                                color: "#FFD700"
                            }
                        }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        ({rating.toFixed(1)})
                    </Typography>
                </Stack>
                
                <Typography 
                    variant="h5" 
                    sx={{ 
                        color: "#D4AF37", 
                        fontWeight: 700,
                        mb: 1
                    }}
                >
                    {currencyTRY.format(product.price)}
                </Typography>
            </CardContent>

            <CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
                <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                    <Button 
                        variant="contained" 
                        size="small" 
                        startIcon={<AddShoppingCart />}
                        onClick={() => dispatch(addItemToCart({ productId: product.id }))} 
                        disabled={status === "pendingAddItem" + product.id}
                        sx={{
                            flex: 1,
                            background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                            color: "black",
                            fontWeight: 600,
                            "&:hover": {
                                background: "linear-gradient(45deg, #B8941F, #E6C200)"
                            },
                            "&:disabled": {
                                background: "rgba(0,0,0,0.12)"
                            }
                        }}
                    >
                        Sepete Ekle
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
}