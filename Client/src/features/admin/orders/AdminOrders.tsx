import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid2,
    Card,
    CardContent,
    Divider
} from "@mui/material";
import { Visibility, LocalShipping, CheckCircle } from "@mui/icons-material";
import requests from "../../../api/requests";
import { IOrder } from "../../../models/IOrder";

export default function AdminOrders() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {
        try {
            const data = await requests.Order.getOrders();
            setOrders(data);
        } catch (error) {
            console.error("Siparişler yüklenemedi:", error);
        } finally {
            setLoading(false);
        }
    }

    function getStatusColor(status: string) {
        switch (status.toLowerCase()) {
            case 'pending': return 'warning';
            case 'shipped': return 'info';
            case 'delivered': return 'success';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    }

    function getStatusText(status: string) {
        switch (status.toLowerCase()) {
            case 'pending': return 'Beklemede';
            case 'shipped': return 'Kargoda';
            case 'delivered': return 'Teslim Edildi';
            case 'cancelled': return 'İptal';
            default: return status;
        }
    }

    function handleViewDetails(order: IOrder) {
        setSelectedOrder(order);
        setDetailsOpen(true);
    }

    if (loading) {
        return <Typography>Siparişler yükleniyor...</Typography>;
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Sipariş Yönetimi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Toplam {orders.length} sipariş
                </Typography>
            </Stack>

            <Paper elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sipariş ID</TableCell>
                            <TableCell>Müşteri</TableCell>
                            <TableCell>Tarih</TableCell>
                            <TableCell>Toplam</TableCell>
                            <TableCell>Durum</TableCell>
                            <TableCell align="right">İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} hover>
                                <TableCell>#{order.id}</TableCell>
                                <TableCell>{order.shippingAddress?.name || 'N/A'}</TableCell>
                                <TableCell>
                                    {new Date(order.orderDate).toLocaleDateString('tr-TR')}
                                </TableCell>
                                <TableCell>₺{order.total.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={getStatusText(order.orderStatus)}
                                        color={getStatusColor(order.orderStatus) as any}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Button
                                            size="small"
                                            startIcon={<Visibility />}
                                            onClick={() => handleViewDetails(order)}
                                        >
                                            Detay
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {/* Order Details Dialog */}
            <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    Sipariş Detayları - #{selectedOrder?.id}
                </DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <Grid2 container spacing={3}>
                            {/* Customer Info */}
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Müşteri Bilgileri
                                        </Typography>
                                        <Typography><strong>Ad:</strong> {selectedOrder.shippingAddress?.name}</Typography>
                                        <Typography><strong>Adres:</strong> {selectedOrder.shippingAddress?.address1}</Typography>
                                        <Typography><strong>Şehir:</strong> {selectedOrder.shippingAddress?.city}</Typography>
                                        <Typography><strong>Ülke:</strong> {selectedOrder.shippingAddress?.country}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid2>

                            {/* Order Info */}
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Sipariş Bilgileri
                                        </Typography>
                                        <Typography><strong>Tarih:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString('tr-TR')}</Typography>
                                        <Typography><strong>Durum:</strong> {getStatusText(selectedOrder.orderStatus)}</Typography>
                                        <Typography><strong>Toplam:</strong> ₺{selectedOrder.total.toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid2>

                            {/* Order Items */}
                            <Grid2 size={12}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Sipariş İçeriği
                                        </Typography>
                                        {selectedOrder.orderItems.map((item, index) => (
                                            <Box key={index}>
                                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                                                    <Box>
                                                        <Typography>{item.name}</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {item.quantity} adet × ₺{item.price.toLocaleString()}
                                                        </Typography>
                                                    </Box>
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        ₺{(item.quantity * item.price).toLocaleString()}
                                                    </Typography>
                                                </Stack>
                                                {index < selectedOrder.orderItems.length - 1 && <Divider />}
                                            </Box>
                                        ))}
                                    </CardContent>
                                </Card>
                            </Grid2>
                        </Grid2>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDetailsOpen(false)}>Kapat</Button>
                    <Button variant="contained" startIcon={<LocalShipping />}>
                        Kargoya Ver
                    </Button>
                    <Button variant="contained" color="success" startIcon={<CheckCircle />}>
                        Teslim Edildi
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
