import { 
    Button, 
    CircularProgress, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    IconButton, 
    Paper, 
    Stack, 
    Typography,
    Container,
    Box,
    Card,
    CardContent,
    Chip,
    Grid2
} from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../models/IOrder";
import requests from "../../api/requests";
import { currencyTRY } from "../../utils/formatCurrency";
import { 
    ArrowRight, 
    Close, 
    Receipt,
    LocalShipping,
    CheckCircle,
    Error,
    Schedule,
    Diamond,
    CalendarToday,
    Person,
    Phone,
    LocationOn
} from "@mui/icons-material";

// Status colors and icons - Updated to match API OrderStatus enum
const getStatusInfo = (status: number) => {
    switch (status) {
        case 0: // Pending - Beklemede
            return { 
                color: '#ff9800', 
                icon: <Schedule />, 
                label: 'Beklemede',
                bgColor: 'rgba(255, 152, 0, 0.1)' 
            };
        case 1: // Shipped - Kargoda
            return { 
                color: '#2196f3', 
                icon: <LocalShipping />, 
                label: 'Kargoda',
                bgColor: 'rgba(33, 150, 243, 0.1)' 
            };
        case 2: // Delivered - Teslim Edildi
            return { 
                color: '#4caf50', 
                icon: <CheckCircle />, 
                label: 'Teslim Edildi',
                bgColor: 'rgba(76, 175, 80, 0.1)' 
            };
        case 3: // Cancelled - İptal Edildi
            return { 
                color: '#f44336', 
                icon: <Error />, 
                label: 'İptal Edildi',
                bgColor: 'rgba(244, 67, 54, 0.1)' 
            };
        default:
            return { 
                color: '#9e9e9e', 
                icon: <Schedule />, 
                label: 'Bilinmeyen',
                bgColor: 'rgba(158, 158, 158, 0.1)' 
            };
    }
};


export default function OrderList() {

    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [open, setOpen] = useState(false);

    function handleDialog(order: Order | null, dialogStatus: boolean) {
        setSelectedOrder(order);
        setOpen(dialogStatus);
    }

    //TODO: USE REDUX AND THUNK METHODS BY YOURSELF
    useEffect(() => {
        setLoading(true);
        requests.Order.getOrders()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <CircularProgress size={60} sx={{ color: "#D4AF37" }} />
        </Box>
    );

    if (!orders || orders.length === 0) {
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
                    <Receipt sx={{ fontSize: 120, color: "#D4AF37", mb: 3, opacity: 0.7 }} />
                    <Typography variant="h3" component="h1" sx={{ 
                        mb: 3, 
                        fontWeight: 700,
                        background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>
                        Henüz Siparişiniz Yok
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                        İlk siparişinizi vermek için ürünlerimize göz atın.
                    </Typography>
                    <Button 
                        variant="contained" 
                        href="/catalog"
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
                <Typography variant="h3" component="h1" sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}>
                    Siparişlerim
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                    Tüm siparişlerinizi buradan takip edebilirsiniz
                </Typography>
            </Box>

            {/* Orders List */}
            <Stack spacing={3}>
                {orders?.map((order) => {
                    const statusInfo = getStatusInfo(order.orderStatus);
                    return (
                        <Card
                            key={order.id}
                            elevation={3}
                            sx={{
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: 6
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Grid2 container spacing={3} alignItems="center">
                                    {/* Order Info */}
                                    <Grid2 size={{ xs: 12, md: 8 }}>
                                        <Stack spacing={2}>
                                            {/* Order Header */}
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Diamond sx={{ color: "#D4AF37" }} />
                                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                    Sipariş #{order.id}
                                                </Typography>
                                                <Chip
                                                    icon={statusInfo.icon}
                                                    label={statusInfo.label}
                                                    sx={{
                                                        backgroundColor: statusInfo.bgColor,
                                                        color: statusInfo.color,
                                                        fontWeight: 600,
                                                        "& .MuiChip-icon": {
                                                            color: statusInfo.color
                                                        }
                                                    }}
                                                />
                                            </Stack>

                                            {/* Order Details */}
                                            <Grid2 container spacing={3}>
                                                <Grid2 size={{ xs: 12, sm: 6 }}>
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <CalendarToday sx={{ fontSize: 16, color: "#D4AF37" }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {new Date(order.orderDate).toLocaleDateString('tr-TR', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </Typography>
                                                    </Stack>
                                                </Grid2>
                                                <Grid2 size={{ xs: 12, sm: 6 }}>
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <Receipt sx={{ fontSize: 16, color: "#D4AF37" }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {order.orderItems?.length || 0} ürün
                                                        </Typography>
                                                    </Stack>
                                                </Grid2>
                                            </Grid2>

                                            {/* Price */}
                                            <Typography variant="h5" sx={{ 
                                                color: "#D4AF37", 
                                                fontWeight: 700 
                                            }}>
                                                {currencyTRY.format(order.subTotal)}
                                            </Typography>
                                        </Stack>
                                    </Grid2>

                                    {/* Actions */}
                                    <Grid2 size={{ xs: 12, md: 4 }}>
                                        <Stack spacing={2} alignItems={{ xs: "stretch", md: "flex-end" }}>
                                            <Button 
                                                onClick={() => handleDialog(order, true)} 
                                                variant="contained"
                                                endIcon={<ArrowRight />}
                                                sx={{
                                                    background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                                    color: "black",
                                                    fontWeight: 600,
                                                    "&:hover": {
                                                        background: "linear-gradient(45deg, #B8941F, #E6C200)"
                                                    }
                                                }}
                                            >
                                                Detayları Görüntüle
                                            </Button>
                                        </Stack>
                                    </Grid2>
                                </Grid2>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>

            {/* Order Detail Dialog */}
            {open && selectedOrder && (
                <Dialog
                    onClose={() => handleDialog(null, false)}
                    open={open}
                    fullWidth
                    maxWidth="lg"
                    sx={{
                        "& .MuiDialog-paper": {
                            borderRadius: 3
                        }
                    }}
                >
                    <DialogTitle sx={{ 
                        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                        color: "white",
                        position: "relative",
                        py: 3
                    }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Diamond sx={{ color: "#D4AF37" }} />
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                Sipariş Detayları - #{selectedOrder.id}
                            </Typography>
                            <Chip
                                icon={getStatusInfo(selectedOrder.orderStatus).icon}
                                label={getStatusInfo(selectedOrder.orderStatus).label}
                                sx={{
                                    backgroundColor: getStatusInfo(selectedOrder.orderStatus).bgColor,
                                    color: getStatusInfo(selectedOrder.orderStatus).color,
                                    fontWeight: 600,
                                    "& .MuiChip-icon": {
                                        color: getStatusInfo(selectedOrder.orderStatus).color
                                    }
                                }}
                            />
                        </Stack>
                        <IconButton 
                            onClick={() => handleDialog(null, false)} 
                            sx={{ 
                                position: "absolute", 
                                right: 16, 
                                top: 16,
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                                }
                            }}
                        >
                            <Close />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ p: 4 }}>
                        {/* Delivery Information */}
                        <Card elevation={2} sx={{ mb: 4, border: "1px solid #D4AF37" }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ 
                                    mb: 3, 
                                    fontWeight: 700,
                                    color: "#D4AF37"
                                }}>
                                    <LocalShipping sx={{ mr: 1, verticalAlign: "middle" }} />
                                    Teslimat Bilgileri
                                </Typography>
                                
                                <Grid2 container spacing={3}>
                                    <Grid2 size={{ xs: 12, md: 4 }}>
                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                            <Person sx={{ fontSize: 18, color: "#D4AF37" }} />
                                            <Typography variant="body2" color="text.secondary">
                                                Ad Soyad:
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            {selectedOrder.firstName} {selectedOrder.lastName}
                                        </Typography>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 4 }}>
                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                            <Phone sx={{ fontSize: 18, color: "#D4AF37" }} />
                                            <Typography variant="body2" color="text.secondary">
                                                Telefon:
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            {selectedOrder.phone}
                                        </Typography>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 4 }}>
                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                            <LocationOn sx={{ fontSize: 18, color: "#D4AF37" }} />
                                            <Typography variant="body2" color="text.secondary">
                                                Adres:
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            {selectedOrder.addressLine}, {selectedOrder.city}
                                        </Typography>
                                    </Grid2>
                                </Grid2>
                            </CardContent>
                        </Card>

                        {/* Order Items */}
                        <Card elevation={2}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ 
                                    mb: 3, 
                                    fontWeight: 700,
                                    color: "#D4AF37"
                                }}>
                                    Sipariş Edilen Ürünler
                                </Typography>
                                
                                <Stack spacing={2}>
                                    {selectedOrder.orderItems?.map((item) => (
                                        <Card key={item.id} variant="outlined" sx={{ p: 2 }}>
                                            <Grid2 container spacing={2} alignItems="center">
                                                <Grid2 size={{ xs: 12, sm: 2 }}>
                                                    <Box
                                                        sx={{
                                                            width: 80,
                                                            height: 80,
                                                            borderRadius: 2,
                                                            overflow: "hidden",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            backgroundColor: "#f8f9fa"
                                                        }}
                                                    >
                                                        <img 
                                                            src={`http://localhost:5298/images/${item.productImg}`} 
                                                            alt={item.productName}
                                                            style={{ 
                                                                width: "100%", 
                                                                height: "100%", 
                                                                objectFit: "cover" 
                                                            }} 
                                                        />
                                                    </Box>
                                                </Grid2>
                                                <Grid2 size={{ xs: 12, sm: 4 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                        {item.productName}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Birim Fiyat: {currencyTRY.format(item.price)}
                                                    </Typography>
                                                </Grid2>
                                                <Grid2 size={{ xs: 12, sm: 2 }}>
                                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                        Adet: {item.quantity}
                                                    </Typography>
                                                </Grid2>
                                                <Grid2 size={{ xs: 12, sm: 4 }}>
                                                    <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                                                        <Typography variant="h6" sx={{ 
                                                            color: "#D4AF37", 
                                                            fontWeight: 700 
                                                        }}>
                                                            {currencyTRY.format(item.quantity * item.price)}
                                                        </Typography>
                                                    </Box>
                                                </Grid2>
                                            </Grid2>
                                        </Card>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, borderTop: "1px solid #e0e0e0" }}>
                        <Button 
                            variant="contained" 
                            onClick={() => handleDialog(null, false)}
                            sx={{
                                background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                color: "black",
                                fontWeight: 600,
                                px: 4,
                                "&:hover": {
                                    background: "linear-gradient(45deg, #B8941F, #E6C200)"
                                }
                            }}
                        >
                            Kapat
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
}