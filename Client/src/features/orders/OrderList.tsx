import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../models/IOrder";
import requests from "../../api/requests";
import { currencyTRY } from "../../utils/formatCurrency";
import { ArrowRight, Close } from "@mui/icons-material";

const orderStatus = ["Beklemede", "Onaylandı", "Ödeme Hatası", "Tamamlandı"];

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

    if (loading) return <CircularProgress />

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>OrderId</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{orderStatus[order.orderStatus]}</TableCell>
                                <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                                <TableCell>{currencyTRY.format(order.subTotal)}</TableCell>
                                <TableCell sx={{ width: 100 }}>
                                    <Button onClick={() => handleDialog(order, true)} size="small" variant="contained" endIcon={<ArrowRight />}>
                                        Detaylar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    
            {/* ✅ Move Dialog here so it is not inside other containers */}
            {open && (
                <Dialog
                    onClose={() => handleDialog(null, false)}
                    open={open}
                    fullWidth
                    maxWidth="lg"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Sipariş No: #{selectedOrder?.id}
                    </DialogTitle>
                    <IconButton onClick={() => handleDialog(null, false)} sx={{ position: "absolute", right: 8, top: 8 }}>
                        <Close />
                    </IconButton>
                    <DialogContent dividers id="alert-dialog-description">
                        <Paper sx={{ p: 3, mb: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>Teslimat Bilgileri</Typography>
                            <Typography gutterBottom>{selectedOrder?.firstName} {selectedOrder?.lastName}</Typography>
                            <Typography gutterBottom>{selectedOrder?.phone}</Typography>
                            <Typography gutterBottom>{selectedOrder?.addressLine} / {selectedOrder?.city}</Typography>
                        </Paper>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Ürün</TableCell>
                                        <TableCell align="right">Fiyat</TableCell>
                                        <TableCell align="right">Adet</TableCell>
                                        <TableCell align="right">Toplam</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedOrder?.orderItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <img src={`http://localhost:5298/images/${item.productImg}`} style={{ height: 60 }} />
                                            </TableCell>
                                            <TableCell>{item.productName}</TableCell>
                                            <TableCell align="right">{currencyTRY.format(item.price)}</TableCell>
                                            <TableCell align="right">x{item.quantity}</TableCell>
                                            <TableCell align="right">{currencyTRY.format(item.quantity * item.price)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={() => handleDialog(null, false)}>KAPAT</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
    
}