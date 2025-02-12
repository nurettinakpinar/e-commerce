import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Container, Card, Typography, Button, Divider, Grid2 } from "@mui/material";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { NavLink } from "react-router";
import { useCartContext } from "../../context/CartContext";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import requests from "../../api/requests";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utils/formatCurrency";



export default function ShoppingCartPage() {

    const [status, setStatus] = useState({ loading: false, id: "" });
    const { cart, setCart } = useCartContext();

    if (!cart || (cart?.cartItems.length == 0)) {
        return (
            <Container
                component={Card}
                sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh", textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>Sepetinize Henüz ürün eklemediniz!</Typography>
                <Typography variant="h6" marginBottom={10}>Ürün eklemek için ürünler sayfasını ziyaret edebilirsiniz!</Typography>
                <Divider sx={{ width: "100%", mb: 10 }} />
                <Button variant="contained" component={NavLink} to="/catalog" sx={{ mt: 2 }}> Alışverişe Devam Et </Button>
            </Container>
        );
    }


    function handleAddItem(productId: number, id: string) {
        setStatus({ loading: true, id: id });

        requests.Cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, id: "" }));
    }

    function handleDeleteItem(productId: number, id: string, quantity = 1) {
        setStatus({ loading: true, id: id });
        requests.Cart.deleteItem(productId, quantity)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, id: "" }));
    }

    return (
        <Grid2 container spacing={3} >
            {/* Table Section - Takes up 3/4 of space */}
            <Grid2 sx={{ xs: 12, md: 9 }}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 850 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Ürün Adı</TableCell>
                                <TableCell align="center">Fiyat</TableCell>
                                <TableCell align="center">Adet</TableCell>
                                <TableCell align="center">Toplam Fiyat</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart?.cartItems.map((item) => (
                                <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" align="left">
                                        <Card sx={{ width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <img src={`http://localhost:5298/images/${item.imageUrl}`} style={{ height: 100 }} />
                                        </Card>
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell align="center">{currencyTRY.format(item.price)}</TableCell>
                                    <TableCell align="center">
                                        <LoadingButton
                                            loading={status.loading && status.id === "add" + item.productId}
                                            onClick={() => handleAddItem(item.productId, "add" + item.productId)}
                                        >
                                            <AddCircleOutline />
                                        </LoadingButton>
                                        {item.quantity}
                                        <LoadingButton
                                            loading={status.loading && status.id === "del" + item.productId}
                                            onClick={() => handleDeleteItem(item.productId, "del" + item.productId)}
                                        >
                                            <RemoveCircleOutline />
                                        </LoadingButton>
                                    </TableCell>
                                    <TableCell align="center">{currencyTRY.format(item.price * item.quantity)}</TableCell>
                                    <TableCell align="center">
                                        <LoadingButton
                                            color="error"
                                            loading={status.loading && status.id === "del_all" + item.productId}
                                            onClick={() => handleDeleteItem(item.productId, "del_all" + item.productId, item.quantity)}
                                        >
                                            <Delete />
                                        </LoadingButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid2>

            {/* Cart Summary Section - Takes up 1/4 of space */}
            <Grid2 sx={{ xs: 12, md: 3 }}>
                <CartSummary />

            </Grid2>
        </Grid2>

    );
}