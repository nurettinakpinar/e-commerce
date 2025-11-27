import { 
    Box, 
    Button, 
    Grid2, 
    Stack, 
    Step, 
    StepLabel, 
    Stepper, 
    Typography,
    Container,
    Card,
    CardContent,
    Divider,
    Alert,
} from "@mui/material";
import Info from "./Info";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { 
    ChevronLeftRounded, 
    ChevronRightRounded, 
    Diamond,
    CheckCircle
} from "@mui/icons-material";
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
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <FormProvider {...methods}>
                {/* Header */}
                <Box sx={{ mb: 4, textAlign: "center" }}>
                    <Typography variant="h3" component="h1" sx={{ 
                        fontWeight: 700, 
                        mb: 2,
                        background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>
                        <Diamond sx={{ mr: 2, verticalAlign: "middle", color: "#D4AF37" }} />
                        Güvenli Ödeme
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Mücevher siparişinizi güvenle tamamlayın
                    </Typography>
                </Box>


                <Card elevation={3} sx={{ borderRadius: 3 }}>
                    <Grid2 container>
                        {/* Order Summary Sidebar */}
                        {activeStep !== steps.length && (
                            <Grid2 size={{ xs: 12, lg: 4 }}>
                                <Box sx={{ 
                                    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                                    p: 3,
                                    borderRadius: "12px 0 0 12px",
                                    height: "100%",
                                    borderRight: { lg: "1px solid #e0e0e0" }
                                }}>
                                    <Info />
                                </Box>
                            </Grid2>
                        )}

                        {/* Main Content */}
                        <Grid2 size={{ xs: 12, lg: activeStep !== steps.length ? 8 : 12 }}>
                            <CardContent sx={{ p: 4 }}>
                                {/* Stepper */}
                                <Box sx={{ mb: 4 }}>
                                    <Stepper 
                                        activeStep={activeStep} 
                                        sx={{ 
                                            "& .MuiStepLabel-root .Mui-completed": {
                                                color: "#D4AF37"
                                            },
                                            "& .MuiStepLabel-root .Mui-active": {
                                                color: "#D4AF37"
                                            },
                                            "& .MuiStepConnector-line": {
                                                borderColor: "#D4AF37"
                                            }
                                        }}
                                    >
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel sx={{ fontWeight: 600 }}>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>

                                {/* Step Content */}
                                <Box>
                                    {activeStep === steps.length ? (
                                        /* Success Page */
                                        <Card 
                                            elevation={0}
                                            sx={{ 
                                                background: "linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)",
                                                border: "2px solid #4caf50",
                                                borderRadius: 3,
                                                p: 4,
                                                textAlign: "center"
                                            }}
                                        >
                                            <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
                                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: "#2e7d32" }}>
                                                Siparişiniz Alındı!
                                            </Typography>
                                            <Typography variant="h6" sx={{ mb: 3 }}>
                                                Teşekkür ederiz. Siparişiniz başarıyla oluşturuldu.
                                            </Typography>
                                            <Alert severity="success" sx={{ mb: 3, textAlign: "left" }}>
                                                <Typography variant="body1">
                                                    <strong>Sipariş Numaranız: #{orderId}</strong><br />
                                                    Siparişiniz onaylandığında size e-mail ile bilgilendirme göndereceğiz.<br />
                                                    Tahmini teslimat süresi: 2-3 iş günü
                                                </Typography>
                                            </Alert>
                                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                                                <Button 
                                                    component={Link} 
                                                    to="/orders" 
                                                    variant="contained"
                                                    size="large"
                                                    sx={{
                                                        background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                                        color: "black",
                                                        fontWeight: 600,
                                                        "&:hover": {
                                                            background: "linear-gradient(45deg, #B8941F, #E6C200)"
                                                        }
                                                    }}
                                                >
                                                    Siparişlerimi Görüntüle
                                                </Button>
                                                <Button 
                                                    component={Link} 
                                                    to="/catalog" 
                                                    variant="outlined"
                                                    size="large"
                                                    sx={{
                                                        borderColor: "#D4AF37",
                                                        color: "#D4AF37",
                                                        "&:hover": {
                                                            borderColor: "#FFD700",
                                                            backgroundColor: "rgba(212, 175, 55, 0.1)"
                                                        }
                                                    }}
                                                >
                                                    Alışverişe Devam Et
                                                </Button>
                                            </Stack>
                                        </Card>
                                    ) : (
                                        /* Form Steps */
                                        <form onSubmit={methods.handleSubmit(handleNext)}>
                                            <Box sx={{ mb: 4 }}>
                                                {getStepContent(activeStep)}
                                            </Box>
                                            
                                            {/* Navigation Buttons */}
                                            <Divider sx={{ mb: 3 }} />
                                            <Box sx={{ 
                                                display: "flex", 
                                                justifyContent: activeStep === 0 ? "flex-end" : "space-between",
                                                flexDirection: { xs: "column", sm: "row" },
                                                gap: 2
                                            }}>
                                                {activeStep !== 0 && (
                                                    <Button 
                                                        startIcon={<ChevronLeftRounded />} 
                                                        variant="outlined"
                                                        onClick={handlePrevious}
                                                        size="large"
                                                        sx={{
                                                            borderColor: "#D4AF37",
                                                            color: "#D4AF37",
                                                            "&:hover": {
                                                                borderColor: "#FFD700",
                                                                backgroundColor: "rgba(212, 175, 55, 0.1)"
                                                            }
                                                        }}
                                                    >
                                                        Geri
                                                    </Button>
                                                )}
                                                <Button 
                                                    endIcon={<ChevronRightRounded />} 
                                                    variant="contained" 
                                                    type="submit" 
                                                    disabled={loading}
                                                    size="large"
                                                    sx={{
                                                        background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                                        color: "black",
                                                        fontWeight: 600,
                                                        px: 4,
                                                        "&:hover": {
                                                            background: "linear-gradient(45deg, #B8941F, #E6C200)"
                                                        },
                                                        "&:disabled": {
                                                            background: "rgba(0,0,0,0.12)"
                                                        }
                                                    }}
                                                >
                                                    {loading ? "İşleniyor..." : 
                                                     activeStep === 2 ? "Siparişi Tamamla" : "İleri"}
                                                </Button>
                                            </Box>
                                        </form>
                                    )}
                                </Box>
                            </CardContent>
                        </Grid2>
                    </Grid2>
                </Card>
            </FormProvider>
        </Container>
    );
}