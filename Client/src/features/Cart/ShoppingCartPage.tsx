import { 
    Container, 
    Card, 
    Typography, 
    Button, 
    Divider, 
    Grid2, 
    Box,
    Stack,
    IconButton,
    Chip,
    Paper
} from "@mui/material";
import { 
    AddCircleOutline, 
    Delete, 
    RemoveCircleOutline, 
    ShoppingCartOutlined,
    LocalShipping,
    Security,
    ArrowBack
} from "@mui/icons-material";
import { Link, NavLink } from "react-router";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart, deleteItemFromCart } from "./cartSlice";
import CartSummary from "./CartSummary";
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function ShoppingCartPage() {

    const { cart, status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    if (!cart || (cart?.cartItems.length == 0)) {
        return (
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Paper
                    elevation={3}
                    sx={{ 
                        p: 6, 
                        textAlign: "center",
                        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
                    }}
                >
                    <ShoppingCartOutlined sx={{ fontSize: 120, color: "#D4AF37", mb: 3, opacity: 0.7 }} />
                    <Typography variant="h3" component="h1" sx={{ 
                        mb: 3, 
                        fontWeight: 700,
                        background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>
                        Sepetiniz Boş
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                        Henüz sepetinize ürün eklemediniz. En güzel mücevherlerimizi keşfetmek için 
                        ürünler sayfasını ziyaret edin.
                    </Typography>
                    <Divider sx={{ mb: 4 }} />
                    <Button 
                        variant="contained" 
                        component={NavLink} 
                        to="/catalog"
                        size="large"
                        sx={{
                            background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                            color: "black",
                            fontWeight: 600,
                            px: 6,
                            py: 2,
                            "&:hover": {
                                background: "linear-gradient(45deg, #B8941F, #E6C200)"
                            }
                        }}
                    >
                        Alışverişe Başla
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Button
                    component={Link}
                    to="/catalog"
                    startIcon={<ArrowBack />}
                    sx={{ mb: 2, color: "#D4AF37" }}
                >
                    Alışverişe Devam Et
                </Button>
                <Typography variant="h3" component="h1" sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}>
                    Alışveriş Sepeti
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                    {cart?.cartItems.length} ürün sepetinizde
                </Typography>
            </Box>

            <Grid2 container spacing={4}>
                {/* Cart Items Section */}
                <Grid2 size={{ xs: 12, md: 8 }}>
                    <Stack spacing={3}>
                        {cart?.cartItems.map((item) => (
                            <Card
                                key={item.productId}
                                sx={{
                                    p: 3,
                                    transition: "all 0.3s ease-in-out",
                                    "&:hover": {
                                        boxShadow: 6
                                    }
                                }}
                            >
                                <Grid2 container spacing={3} alignItems="center">
                                    {/* Product Image */}
                                    <Grid2 size={{ xs: 12, sm: 3 }}>
                                        <Box
                                            sx={{
                                                width: "100%",
                                                height: 150,
                                                borderRadius: 2,
                                                overflow: "hidden",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "#f8f9fa"
                                            }}
                                        >
                                            <img 
                                                src={`http://localhost:5298/images/${item.imageUrl}`} 
                                                alt={item.name}
                                                style={{ 
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover"
                                                }} 
                                            />
                                        </Box>
                                    </Grid2>

                                    {/* Product Details */}
                                    <Grid2 size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: "#D4AF37", fontWeight: 700, mb: 2 }}>
                                            {currencyTRY.format(item.price)}
                                        </Typography>
                                        <Stack direction="row" spacing={1}>
                                            <Chip label="Sertifikalı" size="small" sx={{ backgroundColor: "#D4AF37", color: "black" }} />
                                            <Chip label="Ücretsiz Kargo" size="small" variant="outlined" />
                                        </Stack>
                                    </Grid2>

                                    {/* Quantity Controls */}
                                    <Grid2 size={{ xs: 12, sm: 3 }}>
                                        <Stack spacing={2} alignItems="center">
                                            {/* Quantity Controls */}
                                            <Paper
                                                elevation={1}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    borderRadius: 3,
                                                    p: 1
                                                }}
                                            >
                                                <IconButton
                                                    size="small"
                                                    disabled={status === "pendingDeleteItem" + item.productId + "Single"}
                                                    onClick={() => dispatch(deleteItemFromCart({ productId: item.productId, quantity: 1, key: "Single" }))}
                                                    sx={{
                                                        color: "#D4AF37",
                                                        "&:hover": {
                                                            backgroundColor: "rgba(212, 175, 55, 0.1)"
                                                        }
                                                    }}
                                                >
                                                    <RemoveCircleOutline />
                                                </IconButton>
                                                <Typography variant="h6" sx={{ mx: 2, minWidth: 30, textAlign: "center" }}>
                                                    {item.quantity}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    disabled={status === "pendingAddItem" + item.productId}
                                                    onClick={() => dispatch(addItemToCart({ productId: item.productId }))}
                                                    sx={{
                                                        color: "#D4AF37",
                                                        "&:hover": {
                                                            backgroundColor: "rgba(212, 175, 55, 0.1)"
                                                        }
                                                    }}
                                                >
                                                    <AddCircleOutline />
                                                </IconButton>
                                            </Paper>

                                            {/* Total Price */}
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                {currencyTRY.format(item.price * item.quantity)}
                                            </Typography>

                                            {/* Remove Button */}
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                startIcon={<Delete />}
                                                disabled={status === "pendingDeleteItem" + item.productId + "All"}
                                                onClick={() => dispatch(deleteItemFromCart({ productId: item.productId, quantity: item.quantity, key: "All" }))}
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor: "rgba(211, 47, 47, 0.04)"
                                                    }
                                                }}
                                            >
                                                Kaldır
                                            </Button>
                                        </Stack>
                                    </Grid2>
                                </Grid2>
                            </Card>
                        ))}
                    </Stack>

                    {/* Trust Indicators */}
                    <Paper elevation={1} sx={{ p: 3, mt: 4, backgroundColor: "#f8f9fa" }}>
                        <Stack direction="row" spacing={4} justifyContent="center" alignItems="center">
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <LocalShipping sx={{ color: "#D4AF37" }} />
                                <Typography variant="body2">Ücretsiz Kargo</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Security sx={{ color: "#D4AF37" }} />
                                <Typography variant="body2">Güvenli Ödeme</Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid2>

                {/* Cart Summary Section */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <CartSummary />
                </Grid2>
            </Grid2>
        </Container>
    );
}