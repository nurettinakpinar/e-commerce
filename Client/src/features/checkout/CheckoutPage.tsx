import { Box, Button, Grid2, Paper, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import Info from "./Info";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded, Inventory } from "@mui/icons-material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import requests from "../../api/requests";
import { useAppDispatch } from "../../store/store";
import { clearCart } from "../cart/cartSlice";
import { Link } from "react-router";

const steps = [
    "Teslimat Bilgileri",
    "Ödeme",
    "Sipariş Özeti"
]


function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />

        case 1:
            return <PaymentForm />

        case 2:
            return <Review />

        default:
            throw new Error("Bilinmeyen Step");
    }
}

export default function CheckoutPage() {

    const dispatch = useAppDispatch();

    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm();

    const [orderId, setOrderId] = useState(0);
    const [loading, setLoading] = useState(false);

    async function handleNext(data: FieldValues) {
        console.log()
        if (activeStep === 2) {
            setLoading(true);
            try {
                setOrderId(await requests.Order.createOrder(data));
                setActiveStep(activeStep + 1);
                dispatch(clearCart());
                setLoading(false);
            } catch (error: any) {
                console.log(error.message);
                setLoading(false);
            }
        }
        else {
            setActiveStep(activeStep + 1);
        }
    }

    function handlePrevious() {
        setActiveStep(activeStep - 1);
    }
    return (
        <FormProvider {...methods}>
            <Paper>
                <Grid2 container spacing={2}>
                    {activeStep !== steps.length && (
                        <Grid2 size={4} sx={{ borderRight: "1px solid", borderColor: "divider", p: 3 }}>
                            <Info>
                            </Info>
                        </Grid2>
                    )}

                    <Grid2 size={activeStep !== steps.length ? 8 : 12} sx={{ p: 3 }} >
                        <Box>
                            <Stepper activeStep={activeStep} sx={{ height: 40 }}>
                                {
                                    steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))
                                }
                            </Stepper>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            {activeStep === steps.length ? (
                                <Stack spacing={2} >
                                    <Typography variant="h5"><Inventory /> Teşekkür ederiz. Siparişinizi Aldık</Typography>
                                    <Typography variant="body1">Sipariş Numaranız <strong>#{orderId}</strong>. Siparişiniz onaylandığında size mail ile bilgilendirme göndereceğiz.</Typography>
                                    <Button component={Link} to="/orders" sx={{ alignSelf: "start", width: { xs: "%100", sm: "auto" } }} variant="contained">Siparişleri Listele</Button>
                                </Stack>
                            ) : (
                                <form onSubmit={methods.handleSubmit(handleNext)}>
                                    {getStepContent(activeStep)}
                                    <Box>
                                        <Box sx={[{ display: "flex", justifyContent: "space-between" }, activeStep === 0 && { justifyContent: "flex-end" }]}>
                                            {activeStep !== 0 &&
                                                <Button startIcon={<ChevronLeftRounded />} variant="contained" onClick={handlePrevious}>Geri</Button>
                                            }
                                            <Button endIcon={<ChevronRightRounded />} variant="contained" type="submit" loading={loading}>
                                                {
                                                    activeStep == 2 ? "Siparişi Tamamla" : "İleri"
                                                }
                                            </Button>
                                        </Box>
                                    </Box>
                                </form>
                            )}


                        </Box>
                    </Grid2>
                </Grid2>
            </Paper >
        </FormProvider>
    );
}