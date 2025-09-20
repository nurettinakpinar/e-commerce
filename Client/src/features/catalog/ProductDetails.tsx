import { 
    Button, 
    CircularProgress, 
    Grid2, 
    Stack, 
    Typography, 
    Box,
    Container,
    Paper,
    Chip,
    IconButton,
    Rating,
    Card,
    CardContent,
    Breadcrumbs,
    Link as MuiLink,
    Alert,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router";
import NotFound from "../../errors/NotFound";
import { 
    AddShoppingCart, 
    Favorite, 
    Share, 
    Verified,
    LocalShipping,
    Security,
    NavigateNext,
    CheckCircle,
    Inventory,
    RateReview,
    Person
} from "@mui/icons-material";
import { isFavorite, toggleFavorite } from "../../utils/favorites";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addItemToCart } from "../cart/cartSlice";
import { fetchProductById, productSelector } from "./catalogSlice";
import requests from "../../api/requests";

interface Review {
    id: number;
    productId: number;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
    userName: string;
}

interface ReviewStats {
    averageRating: number;
    totalReviews: number;
}

export default function ProductDetailsPage() {

    const { cart , status} = useAppSelector( state => state.cart); 
    const { user } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelector.selectById(state, Number(id)));
    const {status: loading} = useAppSelector(state=> state.catalog)

    const item = cart?.cartItems.find(i => i.productId == product?.id);

    // Review states
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewStats, setReviewStats] = useState<ReviewStats>({ averageRating: 0, totalReviews: 0 });
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const [reviewLoading, setReviewLoading] = useState(false);
    const [fav, setFav] = useState(false);

    // Define functions before useEffect with useCallback
    const loadReviews = useCallback(async () => {
        if (!product) return;
        try {
            const data = await requests.Review.getProductReviews(product.id);
            setReviews(data);
        } catch (error) {
            console.error('Failed to load reviews:', error);
        }
    }, [product]);

    const loadReviewStats = useCallback(async () => {
        if (!product) return;
        try {
            const data = await requests.Review.getProductStats(product.id);
            setReviewStats(data);
        } catch (error) {
            console.error('Failed to load review stats:', error);
        }
    }, [product]);

    const handleSubmitReview = async () => {
        if (!product || !user) return;
        
        setReviewLoading(true);
        try {
            await requests.Review.create({
                productId: product.id,
                rating: newReview.rating,
                comment: newReview.comment
            });
            
            // Reload reviews and stats
            await loadReviews();
            await loadReviewStats();
            
            // Reset form and close dialog
            setNewReview({ rating: 5, comment: '' });
            setReviewDialogOpen(false);
        } catch (error) {
            console.error('Failed to submit review:', error);
        } finally {
            setReviewLoading(false);
        }
    };

    useEffect(() => {
        if(!product && id)
            dispatch(fetchProductById(parseInt(id)));
    }, [id, product, dispatch]);

    // Load reviews when product is loaded
    useEffect(() => {
        if (product) {
            loadReviews();
            loadReviewStats();
            setFav(isFavorite(product.id));
        }
    }, [product, loadReviews, loadReviewStats]);

    // Check if user has already reviewed this product
    const userHasReviewed = reviews.some(review => review.userId === user?.name);

    // Early returns after all hooks
    if (loading === "pendingFetchProductById") {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                <CircularProgress size={60} sx={{ color: "#D4AF37" }} />
            </Box>
        );
    }

    if (!product) {
        return <NotFound />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Breadcrumbs */}
            <Breadcrumbs 
                separator={<NavigateNext fontSize="small" />} 
                sx={{ mb: 3 }}
                aria-label="breadcrumb"
            >
                <MuiLink component={Link} to="/" color="inherit" underline="hover">
                    Ana Sayfa
                </MuiLink>
                <MuiLink component={Link} to="/catalog" color="inherit" underline="hover">
                    Ürünler
                </MuiLink>
                <Typography color="text.primary">{product.name}</Typography>
            </Breadcrumbs>

            <Grid2 container spacing={6}>
                {/* Product Image */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
                        <Box sx={{ position: "relative" }}>
                            <img 
                                src={`http://localhost:5298/images/${product.imageUrl}`} 
                                alt={product.name}
                                style={{ 
                                    width: "100%", 
                                    height: "500px",
                                    objectFit: "cover",
                                    borderRadius: "12px"
                                }} 
                            />
                            <Chip
                                label="Sertifikalı"
                                icon={<Verified />}
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: 16,
                                    left: 16,
                                    backgroundColor: "#D4AF37",
                                    color: "black",
                                    fontWeight: 600
                                }}
                            />
                            <Stack 
                                direction="column" 
                                spacing={1}
                                sx={{
                                    position: "absolute",
                                    top: 16,
                                    right: 16
                                }}
                            >
                                <IconButton
                                    onClick={() => {
                                        if (!product) return;
                                        const nowFav = toggleFavorite(product.id);
                                        setFav(nowFav);
                                    }}
                                    sx={{
                                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 1)"
                                        }
                                    }}
                                >
                                    <Favorite sx={{ color: fav ? "#D4AF37" : "#9e9e9e" }} />
                                </IconButton>
                                <IconButton
                                    onClick={async () => {
                                        try {
                                            if (navigator.share) {
                                                await navigator.share({
                                                    title: product.name,
                                                    text: product.description,
                                                    url: window.location.href
                                                });
                                            } else if (navigator.clipboard) {
                                                await navigator.clipboard.writeText(window.location.href);
                                                alert("Bağlantı panoya kopyalandı!");
                                            }
                                        } catch (e) {
                                            // ignore
                                        }
                                    }}
                                    sx={{
                                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 1)"
                                        }
                                    }}
                                >
                                    <Share sx={{ color: "#D4AF37" }} />
                                </IconButton>
                            </Stack>
                        </Box>
                    </Paper>
                </Grid2>

                {/* Product Info */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        {/* Product Title */}
                        <Typography variant="h3" component="h1" sx={{ 
                            fontWeight: 700, 
                            mb: 2,
                            background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>
                            {product.name}
                        </Typography>

                        {/* Rating */}
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                            <Rating 
                                value={reviewStats.averageRating} 
                                precision={0.1} 
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
                            {user && !userHasReviewed && (
                                <Button
                                    startIcon={<RateReview />}
                                    onClick={() => setReviewDialogOpen(true)}
                                    size="small"
                                    sx={{ color: '#D4AF37' }}
                                >
                                    Değerlendir
                                </Button>
                            )}
                        </Stack>

                        {/* Price */}
                        <Typography variant="h4" sx={{ 
                            color: "#D4AF37", 
                            fontWeight: 700,
                            mb: 3
                        }}>
                            {currencyTRY.format(product.price)}
                        </Typography>

                        {/* Stock Status */}
                        <Box sx={{ mb: 3 }}>
                            {(product.stock || 0) > 0 ? (
                                <Alert 
                                    icon={<CheckCircle fontSize="inherit" />} 
                                    severity="success" 
                                    sx={{ mb: 2 }}
                                >
                                    Stokta mevcut • {product.stock || 0} adet
                                </Alert>
                            ) : (
                                <Alert 
                                    icon={<Inventory fontSize="inherit" />} 
                                    severity="warning" 
                                    sx={{ mb: 2 }}
                                >
                                    Stokta yok
                                </Alert>
                            )}
                        </Box>

                        {/* Description */}
                        <Paper elevation={1} sx={{ p: 3, mb: 4, backgroundColor: "#f8f9fa" }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                Ürün Açıklaması
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "text.secondary" }}>
                                {product.description}
                            </Typography>
                        </Paper>

                        {/* Features */}
                        <Stack spacing={2} sx={{ mb: 4 }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <LocalShipping sx={{ color: "#D4AF37" }} />
                                <Typography variant="body2">Ücretsiz kargo (500 TL üzeri)</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Security sx={{ color: "#D4AF37" }} />
                                <Typography variant="body2">Güvenli ödeme garantisi</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Verified sx={{ color: "#D4AF37" }} />
                                <Typography variant="body2">Kalite sertifikası dahil</Typography>
                            </Stack>
                        </Stack>

                        {/* Add to Cart */}
                        <Box sx={{ mt: "auto" }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Button 
                                    variant="contained" 
                                    size="large"
                                    startIcon={<AddShoppingCart />} 
                                    disabled={status === "pendingAddItem" + product.id || (product.stock || 0) === 0}
                                    onClick={() => dispatch(addItemToCart({productId: product.id}))}
                                    sx={{
                                        flex: 1,
                                        background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                        color: "black",
                                        fontWeight: 600,
                                        py: 2,
                                        "&:hover": {
                                            background: "linear-gradient(45deg, #B8941F, #E6C200)"
                                        },
                                        "&:disabled": {
                                            background: "rgba(0,0,0,0.12)"
                                        }
                                    }}
                                >
                                    {status === "pendingAddItem" + product.id ? "Ekleniyor..." : "Sepete Ekle"}
                                </Button>
                            </Stack>
                            
                            {item && item.quantity > 0 && (
                                <Alert 
                                    icon={<CheckCircle fontSize="inherit" />} 
                                    severity="success" 
                                    sx={{ mt: 2 }}
                                >
                                    Sepetinizde {item.quantity} adet bulunuyor
                                </Alert>
                            )}
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>

            {/* Additional Product Info */}
            <Box sx={{ mt: 6 }}>
                <Grid2 container spacing={3}>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent sx={{ textAlign: "center", p: 4 }}>
                                <LocalShipping sx={{ fontSize: 48, color: "#D4AF37", mb: 2 }} />
                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                    Hızlı Teslimat
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Aynı gün kargo, 1-2 iş günü teslimat
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent sx={{ textAlign: "center", p: 4 }}>
                                <Security sx={{ fontSize: 48, color: "#D4AF37", mb: 2 }} />
                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                    Güvenli Alışveriş
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    SSL sertifikası ile korumalı ödeme
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent sx={{ textAlign: "center", p: 4 }}>
                                <Verified sx={{ fontSize: 48, color: "#D4AF37", mb: 2 }} />
                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                    Kalite Garantisi
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    2 yıl üretici garantisi
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>

                {/* Reviews Section */}
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                        Müşteri Değerlendirmeleri
                    </Typography>

                    {reviews.length === 0 ? (
                        <Paper sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="body1" color="text.secondary">
                                Bu ürün için henüz değerlendirme yapılmamış.
                            </Typography>
                            {user && (
                                <Button
                                    startIcon={<RateReview />}
                                    onClick={() => setReviewDialogOpen(true)}
                                    sx={{ mt: 2, color: '#D4AF37' }}
                                >
                                    İlk değerlendirmeyi siz yapın
                                </Button>
                            )}
                        </Paper>
                    ) : (
                        <Stack spacing={3}>
                            {reviews.map((review) => (
                                <Paper key={review.id} sx={{ p: 3 }}>
                                    <Stack direction="row" spacing={2}>
                                        <Avatar sx={{ bgcolor: '#D4AF37' }}>
                                            <Person />
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight={600}>
                                                    {review.userName}
                                                </Typography>
                                                <Rating 
                                                    value={review.rating} 
                                                    readOnly 
                                                    size="small"
                                                    sx={{
                                                        "& .MuiRating-iconFilled": {
                                                            color: "#FFD700"
                                                        }
                                                    }}
                                                />
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                                                </Typography>
                                            </Stack>
                                            <Typography variant="body1">
                                                {review.comment}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>
                    )}
                </Box>

                {/* Review Dialog */}
                <Dialog open={reviewDialogOpen} onClose={() => setReviewDialogOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Ürünü Değerlendirin</DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} sx={{ mt: 2 }}>
                            <Box>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Puanınız:
                                </Typography>
                                <Rating
                                    value={newReview.rating}
                                    onChange={(_, value) => setNewReview(prev => ({ ...prev, rating: value || 5 }))}
                                    size="large"
                                    sx={{
                                        "& .MuiRating-iconFilled": {
                                            color: "#FFD700"
                                        }
                                    }}
                                />
                            </Box>
                            <TextField
                                label="Yorumunuz"
                                multiline
                                rows={4}
                                value={newReview.comment}
                                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                                placeholder="Bu ürün hakkında düşüncelerinizi paylaşın..."
                                fullWidth
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setReviewDialogOpen(false)}>
                            İptal
                        </Button>
                        <Button
                            onClick={handleSubmitReview}
                            disabled={!newReview.comment.trim() || reviewLoading}
                            variant="contained"
                            sx={{
                                background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                "&:hover": {
                                    background: "linear-gradient(45deg, #B8941F, #E6C200)"
                                }
                            }}
                        >
                            {reviewLoading ? <CircularProgress size={20} /> : 'Gönder'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
}