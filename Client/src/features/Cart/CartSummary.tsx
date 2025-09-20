import { 
    Box, 
    Button, 
    Card, 
    CardContent, 
    Stack, 
    Typography, 
    Divider,
    Chip,
    Alert
} from "@mui/material";
import { 
    ShoppingCart, 
    LocalShipping, 
    Security 
} from "@mui/icons-material";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppSelector } from "../../store/store";
import { NavLink } from "react-router";

export default function CartSummary() {
    const { cart } = useAppSelector(state => state.cart);

    const subTotal = cart?.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) ?? 0;
    const cargoPrice = subTotal > 500 ? 0 : 49.99;
    const totalAmount = subTotal + cargoPrice;
    
    return (
        <Card 
            elevation={3} 
            sx={{ 
                position: "sticky", 
                top: 20,
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                border: "2px solid #D4AF37"
            }}
        >
            <CardContent sx={{ p: 4 }}>
                {/* Header */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    <ShoppingCart sx={{ color: "#D4AF37" }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Sipariş Özeti
                    </Typography>
                </Stack>

                {/* Free Shipping Alert */}
                {subTotal < 500 && (
                    <Alert 
                        severity="info" 
                        sx={{ mb: 3, backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                    >
                        <Typography variant="body2">
                            {currencyTRY.format(500 - subTotal)} daha ekleyin, ücretsiz kargo kazanın!
                        </Typography>
                    </Alert>
                )}

                {/* Order Details */}
                <Stack spacing={3}>
                    {/* Subtotal */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" color="text.secondary">
                            Ürün Toplam ({cart?.cartItems.length} ürün)
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {currencyTRY.format(subTotal)}
                        </Typography>
                    </Stack>

                    {/* Shipping */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <LocalShipping sx={{ color: "#D4AF37", fontSize: 20 }} />
                            <Typography variant="body1" color="text.secondary">
                                Kargo
                            </Typography>
                        </Stack>
                        {cargoPrice === 0 ? (
                            <Chip 
                                label="ÜCRETSİZ" 
                                size="small" 
                                sx={{ 
                                    backgroundColor: "#4caf50", 
                                    color: "white",
                                    fontWeight: 600
                                }} 
                            />
                        ) : (
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {currencyTRY.format(cargoPrice)}
                            </Typography>
                        )}
                    </Stack>

                    <Divider />

                    {/* Total */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Toplam Tutar
                        </Typography>
                        <Typography variant="h4" sx={{ 
                            color: "#D4AF37", 
                            fontWeight: 700 
                        }}>
                            {currencyTRY.format(totalAmount)}
                        </Typography>
                    </Stack>

                    {/* Trust Indicators */}
                    <Box sx={{ backgroundColor: "#f8f9fa", p: 2, borderRadius: 2 }}>
                        <Stack spacing={1}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Security sx={{ color: "#D4AF37", fontSize: 16 }} />
                                <Typography variant="body2" color="text.secondary">
                                    Güvenli SSL şifrelemesi
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <LocalShipping sx={{ color: "#D4AF37", fontSize: 16 }} />
                                <Typography variant="body2" color="text.secondary">
                                    1-2 iş günü teslimat
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>

                    {/* Checkout Button */}
                    <Button 
                        component={NavLink} 
                        to="/checkout" 
                        variant="contained" 
                        size="large"
                        fullWidth
                        sx={{
                            background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                            color: "black",
                            fontWeight: 700,
                            py: 2,
                            fontSize: "1.1rem",
                            "&:hover": {
                                background: "linear-gradient(45deg, #B8941F, #E6C200)",
                                transform: "translateY(-2px)",
                                boxShadow: 4
                            },
                            transition: "all 0.3s ease-in-out"
                        }}
                    >
                        Siparişi Tamamla
                    </Button>

                    {/* Additional Info */}
                    <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
                        Siparişinizi 24 saat içinde hazırlayıp gönderiyoruz
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}