import { AddShoppingCart, Favorite, Star, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
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
    Rating,
    MobileStepper
} from "@mui/material";
import { Link } from "react-router";
import { IProduct } from "../../models/IProduct";
import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "../../utils/favorites";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../cart/cartSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";
import requests from "../../api/requests";

interface Props {
    product: IProduct
}

export default function Product({ product }: Props) {

    const { status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const [fav, setFav] = useState(false);
    const [reviewStats, setReviewStats] = useState<{averageRating: number, totalReviews: number}>({
        averageRating: 0,
        totalReviews: 0
    });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        setFav(isFavorite(product.id));
        loadReviewStats();
        
        // Load product images
        if (product.imageUrls) {
            try {
                const imageArray = JSON.parse(product.imageUrls);
                setImages(Array.isArray(imageArray) ? imageArray : [product.imageUrl || ""]);
            } catch {
                setImages(product.imageUrl ? [product.imageUrl] : []);
            }
        } else {
            setImages(product.imageUrl ? [product.imageUrl] : []);
        }
        setCurrentImageIndex(0);
    }, [product.id, product.imageUrl, product.imageUrls]);

    const loadReviewStats = async () => {
        try {
            const stats = await requests.Review.getProductStats(product.id);
            setReviewStats(stats);
        } catch (error) {
            // If no reviews, keep default values
            console.log("No reviews for product", product.id);
        }
    };

    return (
        <Card 
            sx={{ 
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    "& .nav-arrow": {
                        opacity: 1
                    }
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
                        image={images.length > 0 ? `http://localhost:5298/images/${images[currentImageIndex]}` : '/placeholder.jpg'} 
                    />
                </Box>
                
                {/* Image Navigation - Only show on hover */}
                {images.length > 1 && (
                    <>
                        <IconButton
                            className="nav-arrow nav-arrow-left"
                            sx={{
                                position: "absolute",
                                left: 8,
                                top: "50%",
                                transform: "translateY(-50%)",
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.8)"
                                },
                                width: 32,
                                height: 32,
                                opacity: 0,
                                transition: "opacity 0.3s ease",
                                zIndex: 2
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
                            }}
                        >
                            <KeyboardArrowLeft />
                        </IconButton>
                        <IconButton
                            className="nav-arrow nav-arrow-right"
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: "50%",
                                transform: "translateY(-50%)",
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.8)"
                                },
                                width: 32,
                                height: 32,
                                opacity: 0,
                                transition: "opacity 0.3s ease",
                                zIndex: 2
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
                            }}
                        >
                            <KeyboardArrowRight />
                        </IconButton>
                        
                        {/* Image Dots */}
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 8,
                                left: "50%",
                                transform: "translateX(-50%)",
                                display: "flex",
                                gap: 0.5,
                                zIndex: 2
                            }}
                        >
                            {images.map((_, index) => (
                                <Box
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setCurrentImageIndex(index);
                                    }}
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        backgroundColor: index === currentImageIndex ? "white" : "rgba(255, 255, 255, 0.5)",
                                        cursor: "pointer",
                                        transition: "all 0.2s"
                                    }}
                                />
                            ))}
                        </Box>
                    </>
                )}
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
                
                {reviewStats.totalReviews > 0 && (
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <Rating 
                            value={reviewStats.averageRating} 
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
                            ({reviewStats.averageRating.toFixed(1)}) • {reviewStats.totalReviews} değerlendirme
                        </Typography>
                    </Stack>
                )}
                
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