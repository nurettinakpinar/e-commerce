import { Button, Card, Container, Divider, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router";
import { Home, ShoppingBag, ArrowBack, SearchOff } from "@mui/icons-material";

export default function NotFound() {
    return (
        <Container component={Card} sx={{ p: 6, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh" }}>
            <Stack spacing={3} alignItems="center" sx={{ textAlign: "center" }}>
                <SearchOff sx={{ fontSize: 80, color: "#D4AF37" }} />
                <Typography variant="h2" sx={{
                    fontWeight: 800,
                    background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}>
                    404 - Sayfa Bulunamadı
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Aradığınız sayfa taşınmış, silinmiş veya geçici olarak kullanılamıyor olabilir.
                </Typography>
                <Divider sx={{ width: "100%", my: 2 }} />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button startIcon={<ArrowBack />} variant="outlined" onClick={() => history.back()}
                        sx={{
                            borderColor: "#D4AF37",
                            color: "#D4AF37",
                            "&:hover": { borderColor: "#FFD700", backgroundColor: "rgba(212,175,55,0.08)" }
                        }}
                    >
                        Geri Dön
                    </Button>
                    <Button startIcon={<Home />} component={NavLink} to="/" variant="contained"
                        sx={{
                            background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                            color: "black",
                            fontWeight: 700,
                            "&:hover": { background: "linear-gradient(45deg, #B8941F, #E6C200)" }
                        }}
                    >
                        Ana Sayfa
                    </Button>
                    <Button startIcon={<ShoppingBag />} component={NavLink} to="/catalog" variant="contained"
                        sx={{
                            background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                            color: "black",
                            fontWeight: 700,
                            "&:hover": { background: "linear-gradient(45deg, #B8941F, #E6C200)" }
                        }}
                    >
                        Ürünlere Git
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}
