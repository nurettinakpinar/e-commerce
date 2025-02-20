import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Container, Card, Typography, Button, Divider, Grid2 } from "@mui/material";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { NavLink } from "react-router";
import { LoadingButton } from "@mui/lab";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart, deleteItemFromCart } from "./cartSlice";
import CartSummary from "./CartSummary";
import { useAppDispatch, useAppSelector } from "../../store/store";



export default function ShoppingCartPage() {

    const { cart, status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

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
                                            loading={status === "pendingAddItem" + item.productId}
                                            onClick={() => dispatch(addItemToCart({ productId: item.productId }))}
                                        >
                                            <AddCircleOutline />
                                        </LoadingButton>
                                        {item.quantity}
                                        <LoadingButton
                                            loading={status === "pendingDeleteItem" + item.productId + "Single"}
                                            onClick={() => dispatch(deleteItemFromCart({ productId: item.productId, quantity: 1, key: "Single" }))}
                                        >
                                            <RemoveCircleOutline />
                                        </LoadingButton>
                                    </TableCell>
                                    <TableCell align="center">{currencyTRY.format(item.price * item.quantity)}</TableCell>
                                    <TableCell align="center">
                                        <LoadingButton
                                            color="error"
                                            loading={status === "pendingDeleteItem" + item.productId + "All"}
                                            onClick={() => dispatch(deleteItemFromCart({ productId: item.productId, quantity: item.quantity, key: "All" }))}
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