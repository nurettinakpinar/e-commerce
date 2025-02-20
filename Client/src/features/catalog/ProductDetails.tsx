import { CircularProgress, Divider, Grid2, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import NotFound from "../../errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addItemToCart } from "../cart/cartSlice";
import { fetchProductById, productSelector } from "./catalogSlice";

export default function ProductDeatilsPage() {

    const { cart , status} = useAppSelector( state => state.cart); 
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelector.selectById(state, Number(id)));
    const {status: loading} = useAppSelector(state=> state.catalog)

    const item = cart?.cartItems.find(i => i.productId == product?.id);

    useEffect(() => {
        if(!product && id)
            dispatch(fetchProductById(parseInt(id)));
    }, [id]);


    if (loading === "pendingFetchProductById")
        return (<CircularProgress />);

    if (!product)
        return (<NotFound />)
    return (
        <Grid2 container spacing={6}>
            <Grid2 size={{ xl: 3, lg: 4, md: 5, sm: 6, xs: 12 }}>
                <img src={`http://localhost:5298/images/${product.imageUrl}`} style={{ width: "100%" }} />
            </Grid2>
            <Grid2 size={{ xl: 9, lg: 8, md: 7, sm: 6, xs: 12 }}>
                <Typography variant="h3">
                    {product.name}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color="secondary">{currencyTRY.format(product.price)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Açıklama</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Mevcut Stok</TableCell>
                                <TableCell>{product.stock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack direction="row" sx={{mt: 4}} alignItems="center" spacing={2}>
                    <LoadingButton variant="outlined" loadingPosition="start" startIcon={<AddShoppingCart />} loading={status === "pendingAddItem" + product.id}
                        onClick={() => dispatch(addItemToCart({productId: product.id}))}>
                        Sepete Ekle
                    </LoadingButton>
                    {
                        item?.quantity! > 0 && (
                            <Typography variant="body2">Sepetinize {item?.quantity} adet eklendi.</Typography>
                        )
                    }
                </Stack>
            </Grid2>
        </Grid2>
    );
}