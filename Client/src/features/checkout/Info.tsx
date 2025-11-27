import { 
    Avatar, 
    Box, 
    List, 
    ListItem, 
    ListItemAvatar, 
    ListItemText, 
    Stack, 
    Typography,
    Divider,
    Card,
    CardContent,
    Chip,
    Alert
} from "@mui/material";
import { useAppSelector } from "../../store/store";
import { currencyTRY } from "../../utils/formatCurrency";
import { ShoppingCart, Diamond,Inventory } from "@mui/icons-material";

export default function Info() {
    const { cart } = useAppSelector(state => state.cart);
    const subTotal = cart?.cartItems.reduce((toplam, item) => toplam + (item.price * item.quantity), 0) ?? 0;
    const itemCount = cart?.cartItems.reduce((total, item) => total + item.quantity, 0) ?? 0;
    const shippingCost = subTotal >= 500 ? 0 : 50; // Free shipping over 500 TL
    const total = subTotal + shippingCost;

    return (
        <Box>
            {/* Header */}
            <Typography variant="h6" sx={{ 
                mb: 3, 
                fontWeight: 700,
                color: "#D4AF37",
                display: "flex",
                alignItems: "center"
            }}>
                <ShoppingCart sx={{ mr: 2 }} />
                Sipariş Özeti
            </Typography>

            {/* Items Count */}
            <Box sx={{ mb: 3, textAlign: "center" }}>
                <Chip 
                    icon={<Inventory />}
                    label={`${itemCount} Ürün`}
                    sx={{ 
                        backgroundColor: "#D4AF37", 
                        color: "black", 
                        fontWeight: 600 
                    }}
                />
            </Box>

            {/* Cart Items */}
            <Card variant="outlined" sx={{ mb: 3, border: "1px solid #D4AF37" }}>
                <CardContent sx={{ p: 2 }}>
                    <List sx={{ p: 0 }}>
                        {cart?.cartItems.map((item, index) => (
                            <Box key={item.productId}>
                                <ListItem sx={{ px: 0, py: 2 }}>
                                    <ListItemAvatar>
                                        <Avatar 
                                            variant="rounded" 
                                            src={`${import.meta.env.VITE_API_URL}/images/${item.imageUrl}`}
                                            sx={{ 
                                                width: 50, 
                                                height: 50,
                                                border: "2px solid #D4AF37"
                                            }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        sx={{ ml: 2 }}
                                        primary={
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                                                <Diamond sx={{ fontSize: 12, color: "#D4AF37" }} />
                                                <Typography variant="caption" color="text.secondary">
                                                    {item.quantity} adet
                                                </Typography>
                                            </Stack>
                                        }
                                    />
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#D4AF37" }}>
                                        {currencyTRY.format(item.price * item.quantity)}
                                    </Typography>
                                </ListItem>
                                {index < cart.cartItems.length - 1 && <Divider />}
                            </Box>
                        ))}
                    </List>
                </CardContent>
            </Card>

            {/* Price Breakdown */}
            <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                        {/* Subtotal */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                                Ara Toplam:
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {currencyTRY.format(subTotal)}
                            </Typography>
                        </Box>

                        {/* Shipping */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                                Kargo:
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    fontWeight: 600,
                                    color: shippingCost === 0 ? "#4caf50" : "inherit"
                                }}
                            >
                                {shippingCost === 0 ? "Ücretsiz" : currencyTRY.format(shippingCost)}
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Total */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                Toplam:
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: "#D4AF37" }}>
                                {currencyTRY.format(total)}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>

            {/* Free Shipping Alert */}
            {subTotal < 500 && (
                <Alert 
                    severity="info" 
                    sx={{ 
                        mb: 3,
                        backgroundColor: "rgba(33, 150, 243, 0.1)",
                        border: "1px solid #2196f3",
                        fontSize: "0.875rem"
                    }}
                >
                    <Typography variant="body2">
                        {currencyTRY.format(500 - subTotal)} daha ekleyin, ücretsiz kargo kazanın!
                    </Typography>
                </Alert>
            )}

        </Box>
    );
}