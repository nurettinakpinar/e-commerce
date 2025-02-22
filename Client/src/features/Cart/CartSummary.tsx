import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppSelector } from "../../store/store";
import { NavLink } from "react-router";

export default function CartSummary() {
    const { cart } = useAppSelector(state => state.cart);

    {/*Reduce function used to accumulate values in an array and return single result. Yani this function can use for summing value in an array.*/ }
    const subTotal = cart?.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) ?? 0;
    const cargoPrice = subTotal > 1000 ? 0 : 49.99;
    return (
        <Card variant="outlined" sx={{ minWidth: 225 }}>
            <Typography variant="h5" padding={2} noWrap>Sipariş Özeti</Typography>
            <CardContent>
                <Stack direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body1" component="h2" color="text-secondary">
                        Ürün Toplam
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {currencyTRY.format(subTotal)}
                    </Typography>
                </Stack>
                <Stack direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
                    <Typography variant="body1" component="h2" color="text-secondary">
                        Kargo
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {currencyTRY.format(cargoPrice)}
                    </Typography>
                </Stack>
                <Stack direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 5 }}>
                    <Typography variant="body1" component="h2" color="text-secondary">
                        Total Toplam
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {currencyTRY.format(subTotal + cargoPrice)}
                    </Typography>
                </Stack>
                {/* Centering the Button */}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button component={NavLink} to="/checkout" variant="contained" size="small" color="success">
                    Siparişi Oluştur
                        </Button>
                </Box>
            </CardContent>
        </Card>
    );
}