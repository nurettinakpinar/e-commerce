import { 
    DeliveryDining, 
    Payments, 
    Person,
    Phone,
    LocationOn,
    CreditCard,
    Security,
    CheckCircle
} from "@mui/icons-material";
import { 
    Stack, 
    Typography, 
    Box, 
    Card, 
    CardContent, 
    Grid2,
    Alert,
    Chip
} from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function Review() {

    const { getValues } = useFormContext();

    // Helper function to mask card number
    const maskCardNumber = (cardNumber: string) => {
        if (!cardNumber) return '';
        const cleaned = cardNumber.replace(/\s/g, '');
        if (cleaned.length >= 4) {
            const lastFour = cleaned.slice(-4);
            const masked = '**** **** **** ' + lastFour;
            return masked;
        }
        return cardNumber;
    };

    return (
        <Box>
            {/* Header */}
            <Typography variant="h5" sx={{ 
                mb: 3, 
                fontWeight: 700,
                color: "#D4AF37",
                display: "flex",
                alignItems: "center"
            }}>
                <CheckCircle sx={{ mr: 2 }} />
                Sipariş Özeti
            </Typography>

            {/* Review Alert */}
            <Alert 
                severity="warning" 
                sx={{ 
                    mb: 4,
                    backgroundColor: "rgba(255, 152, 0, 0.1)",
                    border: "1px solid #ff9800"
                }}
            >
                <Typography variant="body2">
                    <strong>Lütfen Kontrol Edin:</strong> Sipariş vermeden önce teslimat ve ödeme bilgilerinizi 
                    kontrol ediniz. Sipariş tamamlandıktan sonra değişiklik yapılamaz.
                </Typography>
            </Alert>

            <Grid2 container spacing={4}>
                {/* Delivery Information */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Card 
                        variant="outlined" 
                        sx={{ 
                            height: "100%",
                            border: "2px solid #D4AF37",
                            borderRadius: 3
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ 
                                mb: 3, 
                                fontWeight: 700,
                                color: "#D4AF37",
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <DeliveryDining sx={{ mr: 2 }} />
                                Teslimat Bilgileri
                            </Typography>

                            <Stack spacing={2}>
                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                        <Person sx={{ fontSize: 18, color: "#D4AF37" }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Ad Soyad:
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body1" sx={{ fontWeight: 600, ml: 3 }}>
                                        {getValues("firstname")} {getValues("lastname")}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                        <Phone sx={{ fontSize: 18, color: "#D4AF37" }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Telefon:
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body1" sx={{ fontWeight: 600, ml: 3 }}>
                                        {getValues("phone")}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                        <LocationOn sx={{ fontSize: 18, color: "#D4AF37" }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Adres:
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body1" sx={{ fontWeight: 600, ml: 3 }}>
                                        {getValues("addressline")}, {getValues("city")}
                                    </Typography>
                                </Box>
            </Stack>

                            <Box sx={{ mt: 3 }}>
                                <Chip 
                                    label="Ücretsiz Kargo" 
                                    size="small" 
                                    sx={{ 
                                        backgroundColor: "#4caf50", 
                                        color: "white", 
                                        fontWeight: 600 
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid2>

                {/* Payment Information */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Card 
                        variant="outlined" 
                        sx={{ 
                            height: "100%",
                            border: "2px solid #D4AF37",
                            borderRadius: 3
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ 
                                mb: 3, 
                                fontWeight: 700,
                                color: "#D4AF37",
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <Payments sx={{ mr: 2 }} />
                                Ödeme Bilgileri
                            </Typography>

                            <Stack spacing={2}>
                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                        <CreditCard sx={{ fontSize: 18, color: "#D4AF37" }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Kart Sahibi:
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body1" sx={{ fontWeight: 600, ml: 3 }}>
                                        {getValues("cardname")}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                        <Security sx={{ fontSize: 18, color: "#D4AF37" }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Kart Numarası:
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body1" sx={{ fontWeight: 600, ml: 3 }}>
                                        {maskCardNumber(getValues("cardnumber"))}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                                            Son Kullanma:
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body1" sx={{ fontWeight: 600, ml: 3 }}>
                                        {getValues("cardexpiremonth")}/{getValues("cardexpireyear")}
                                    </Typography>
                                </Box>
        </Stack>

                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>

            {/* Final Confirmation */}
            <Alert 
                severity="success" 
                sx={{ 
                    mt: 4,
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                    border: "1px solid #4caf50"
                }}
            >
                <Typography variant="body1">
                    <strong>Sipariş Hazır!</strong> "Siparişi Tamamla" butonuna tıklayarak ödemenizi gerçekleştirin.
                    Siparişiniz onaylandıktan sonra e-mail ile bilgilendirme alacaksınız.
                </Typography>
            </Alert>
        </Box>
    );
}