import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../models/IOrder";
import requests from "../../api/requests";
import { currencyTRY } from "../../utils/formatCurrency";
import { ArrowRight, Close } from "@mui/icons-material";

const orderStatus = ["Beklemede", "Onaylandı", "Ödeme Hatası", "Tamamlandı"];

const logs = [
    {
        "id": 1,
        "type": "DEBUG",
        "ipAddr": "10.0.0.1",
        "timestamp": "2025-02-02 23:42:33"
    },
    {
        "id": 2,
        "type": "INFO",
        "ipAddr": "192.168.1.1",
        "timestamp": "2025-02-16 09:21:52"
    },
    {
        "id": 3,
        "type": "INFO",
        "ipAddr": "192.168.1.1",
        "timestamp": "2025-02-05 19:07:45"
    },
    {
        "id": 4,
        "type": "DEBUG",
        "ipAddr": "10.0.0.1",
        "timestamp": "2025-02-17 08:54:08"
    },
    {
        "id": 5,
        "type": "WARNING",
        "ipAddr": "192.168.100.100",
        "timestamp": "2025-02-03 15:07:13"
    },
    {
        "id": 6,
        "type": "DEBUG",
        "ipAddr": "192.168.1.1",
        "timestamp": "2025-01-28 05:17:01"
    },
    {
        "id": 7,
        "type": "DEBUG",
        "ipAddr": "192.168.100.100",
        "timestamp": "2025-02-12 17:02:33"
    },
    {
        "id": 8,
        "type": "INFO",
        "ipAddr": "172.16.0.1",
        "timestamp": "2025-02-16 06:34:30"
    },
    {
        "id": 9,
        "type": "DEBUG",
        "ipAddr": "172.16.0.1",
        "timestamp": "2025-02-13 14:15:54"
    },
    {
        "id": 10,
        "type": "ERROR",
        "ipAddr": "10.0.0.1",
        "timestamp": "2025-02-16 04:42:25"
    },
    {
        "id": 11,
        "type": "DEBUG",
        "ipAddr": "10.0.0.1",
        "timestamp": "2025-02-15 17:52:50"
    },
    {
        "id": 12,
        "type": "ERROR",
        "ipAddr": "10.0.0.1",
        "timestamp": "2025-02-18 23:58:44"
    },
    {
        "id": 13,
        "type": "ERROR",
        "ipAddr": "10.0.0.1",
        "timestamp": "2025-02-07 02:21:32"
    },
    {
        "id": 14,
        "type": "ERROR",
        "ipAddr": "10.0.0.1",
        "timestamp": "2025-02-04 17:10:14"
    },
    {
        "id": 15,
        "type": "DEBUG",
        "ipAddr": "192.168.100.100",
        "timestamp": "2025-02-10 06:13:41"
    },
    {
        "id": 16,
        "type": "CRITICAL",
        "ipAddr": "172.16.0.1",
        "timestamp": "2025-01-31 10:42:25"
    },
    {
        "id": 17,
        "type": "DEBUG",
        "ipAddr": "172.16.0.1",
        "timestamp": "2025-02-08 00:50:15"
    },
    {
        "id": 18,
        "type": "DEBUG",
        "ipAddr": "172.16.0.1",
        "timestamp": "2025-02-14 15:24:31"
    },
    {
        "id": 19,
        "type": "DEBUG",
        "ipAddr": "10.0.0.1",
        "timestamp": "2025-02-12 18:57:13"
    },
    {
        "id": 20,
        "type": "ERROR",
        "ipAddr": "192.168.1.1",
        "timestamp": "2025-02-16 00:27:08"
    }
]


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
                            <TableCell>Sipariş No</TableCell>
                            <TableCell>Sipariş Durumu</TableCell>
                            <TableCell>Sipariş Oluşturma Tarihi</TableCell>
                            <TableCell>Toplam</TableCell>
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