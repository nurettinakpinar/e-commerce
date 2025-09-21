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
    Divider,
    Alert,
    TextField,
    MenuItem,
    IconButton,
    Tooltip
} from "@mui/material";
import { 
    Visibility, 
    LocalShipping, 
    CheckCircle, 
    Cancel, 
    Delete,
    Edit,
    Refresh,
    FilterList
} from "@mui/icons-material";
import requests from "../../../api/requests";
import { Order } from "../../../models/IOrder";

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [updating, setUpdating] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {
        try {
            setLoading(true);
            setError(null);
            const data = await requests.Order.getAllOrders(); // Admin endpoint kullan
            setOrders(data);
        } catch (error: any) {
            console.error("Siparişler yüklenemedi:", error);
            setError("Siparişler yüklenemedi: " + (error.message || "Bilinmeyen hata"));
        } finally {
            setLoading(false);
        }
    }

    async function updateOrderStatus(orderId: number, newStatus: number) {
        try {
            setUpdating(orderId);
            setError(null);
            await requests.Order.updateOrderStatus(orderId, newStatus);
            
            setOrders(prev => prev.map(order => 
                order.id === orderId 
                    ? { ...order, orderStatus: newStatus }
                    : order
            ));
            
            setSuccess(`Sipariş durumu başarıyla güncellendi: ${getStatusText(newStatus)}`);
            setTimeout(() => setSuccess(null), 3000);
        } catch (error: any) {
            setError("Durum güncellenemedi: " + (error.message || "Bilinmeyen hata"));
        } finally {
            setUpdating(null);
        }
    }

    async function deleteOrder(orderId: number) {
        if (!window.confirm("Bu siparişi silmek istediğinizden emin misiniz? Stok geri yüklenecektir.")) {
            return;
        }
        
        try {
            setError(null);
            await requests.Order.deleteOrder(orderId);
            setOrders(prev => prev.filter(order => order.id !== orderId));
            setSuccess("Sipariş başarıyla silindi ve stok geri yüklendi");
            setTimeout(() => setSuccess(null), 3000);
        } catch (error: any) {
            setError("Sipariş silinemedi: " + (error.message || "Bilinmeyen hata"));
        }
    }

    function getStatusColor(status: string | number) {
        const statusNum = typeof status === 'string' ? parseInt(status) : status;
        switch (statusNum) {
            case 0: return 'warning';  // Pending
            case 1: return 'info';     // Shipped
            case 2: return 'success';  // Delivered
            case 3: return 'error';    // Cancelled
            default: return 'default';
        }
    }

    function getStatusText(status: string | number) {
        const statusNum = typeof status === 'string' ? parseInt(status) : status;
        switch (statusNum) {
            case 0: return 'Beklemede';
            case 1: return 'Kargoda';
            case 2: return 'Teslim Edildi';
            case 3: return 'İptal';
            default: return `Durum ${status}`;
        }
    }

    function handleViewDetails(order: Order) {
        setSelectedOrder(order);
        setDetailsOpen(true);
    }

    const filteredOrders = statusFilter === 'all' 
        ? orders 
        : orders.filter(order => order.orderStatus.toString() === statusFilter);

    if (loading) {
        return (
            <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>Siparişler yükleniyor...</Typography>
                <Alert severity="info">Veriler yükleniyor...</Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Sipariş Yönetimi
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                        select
                        size="small"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        sx={{ minWidth: 150 }}
                        InputProps={{
                            startAdornment: <FilterList sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                    >
                        <MenuItem value="all">Tüm Siparişler ({orders.length})</MenuItem>
                        <MenuItem value="0">Beklemede ({orders.filter(o => o.orderStatus === 0).length})</MenuItem>
                        <MenuItem value="1">Kargoda ({orders.filter(o => o.orderStatus === 1).length})</MenuItem>
                        <MenuItem value="2">Teslim Edildi ({orders.filter(o => o.orderStatus === 2).length})</MenuItem>
                        <MenuItem value="3">İptal ({orders.filter(o => o.orderStatus === 3).length})</MenuItem>
                    </TextField>
                    <Tooltip title="Yenile">
                        <IconButton onClick={loadOrders} disabled={loading}>
                            <Refresh />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}
            
            {success && (
                <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
                    {success}
                </Alert>
            )}

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
                        {filteredOrders.map((order) => (
                            <TableRow key={order.id} hover>
                                <TableCell>#{order.id}</TableCell>
                                <TableCell>{`${order.firstName} ${order.lastName}` || 'N/A'}</TableCell>
                                <TableCell>
                                    {new Date(order.orderDate).toLocaleDateString('tr-TR')}
                                </TableCell>
                                <TableCell>₺{((order.subTotal || 0) + (order.deliveryFee || 0)).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={getStatusText(order.orderStatus)}
                                        color={getStatusColor(order.orderStatus) as any}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Tooltip title="Detay Görüntüle">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleViewDetails(order)}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip>
                                        
                                        {order.orderStatus === 0 && (
                                            <>
                                                <Tooltip title="Kargoya Ver">
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        disabled={updating === order.id}
                                                        onClick={() => updateOrderStatus(order.id, 1)}
                                                    >
                                                        <LocalShipping />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="İptal Et">
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        disabled={updating === order.id}
                                                        onClick={() => updateOrderStatus(order.id, 3)}
                                                    >
                                                        <Cancel />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        )}
                                        
                                        {order.orderStatus === 1 && (
                                            <Tooltip title="Teslim Edildi">
                                                <IconButton
                                                    size="small"
                                                    color="success"
                                                    disabled={updating === order.id}
                                                    onClick={() => updateOrderStatus(order.id, 2)}
                                                >
                                                    <CheckCircle />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        
                                        <Tooltip title="Siparişi Sil">
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => deleteOrder(order.id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
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
                                        <Typography><strong>Ad:</strong> {`${selectedOrder.firstName} ${selectedOrder.lastName}`}</Typography>
                                        <Typography><strong>Telefon:</strong> {selectedOrder.phone}</Typography>
                                        <Typography><strong>Adres:</strong> {selectedOrder.addressLine}</Typography>
                                        <Typography><strong>Şehir:</strong> {selectedOrder.city}</Typography>
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
                                        <Typography><strong>Ara Toplam:</strong> ₺{(selectedOrder.subTotal || 0).toLocaleString()}</Typography>
                                        <Typography><strong>Kargo:</strong> ₺{(selectedOrder.deliveryFee || 0).toLocaleString()}</Typography>
                                        <Typography><strong>Toplam:</strong> ₺{((selectedOrder.subTotal || 0) + (selectedOrder.deliveryFee || 0)).toLocaleString()}</Typography>
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
                                                        <Typography>{item.productName}</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {item.quantity} adet × ₺{(item.price || 0).toLocaleString()}
                                                        </Typography>
                                                    </Box>
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        ₺{((item.quantity || 0) * (item.price || 0)).toLocaleString()}
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
                    
                    {selectedOrder && selectedOrder.orderStatus === 0 && (
                        <>
                            <Button 
                                variant="contained" 
                                startIcon={<LocalShipping />}
                                disabled={updating === selectedOrder.id}
                                onClick={async () => {
                                    await updateOrderStatus(selectedOrder.id, 1);
                                    setDetailsOpen(false);
                                }}
                            >
                                Kargoya Ver
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="error" 
                                startIcon={<Cancel />}
                                disabled={updating === selectedOrder.id}
                                onClick={async () => {
                                    await updateOrderStatus(selectedOrder.id, 3);
                                    setDetailsOpen(false);
                                }}
                            >
                                İptal Et
                            </Button>
                        </>
                    )}
                    
                    {selectedOrder && selectedOrder.orderStatus === 1 && (
                        <Button 
                            variant="contained" 
                            color="success" 
                            startIcon={<CheckCircle />}
                            disabled={updating === selectedOrder.id}
                            onClick={async () => {
                                await updateOrderStatus(selectedOrder.id, 2);
                                setDetailsOpen(false);
                            }}
                        >
                            Teslim Edildi
                        </Button>
                    )}
                    
                    {selectedOrder && (
                        <Button 
                            variant="outlined" 
                            color="error" 
                            startIcon={<Delete />}
                            onClick={async () => {
                                await deleteOrder(selectedOrder.id);
                                setDetailsOpen(false);
                            }}
                        >
                            Siparişi Sil
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Box>
    );
}
