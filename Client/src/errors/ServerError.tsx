import { Button, Card, Container, Divider, Stack, Typography } from "@mui/material";
import { useLocation, Link } from "react-router";
import { BugReport, Replay, Home, SupportAgent } from "@mui/icons-material";

export default function ServerError() {

    const { state } = useLocation();

    return (
        <Container component={Card} sx={{ p: 6, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh" }}>
            <Stack spacing={3} sx={{ textAlign: "center" }}>
                <BugReport sx={{ fontSize: 80, color: "#D4AF37" }} />
                <Typography variant="h3" sx={{ fontWeight: 800 }}>
                    Sunucu Hatası
                </Typography>
                {state?.error && (
                    <Stack spacing={1}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {state.error.title} {state.status ? `- ${state.status}` : ""}
                        </Typography>
                        <Divider />
                        <Typography variant="body2" color="text.secondary">
                            {state.error.detail || "Bilinmeyen bir hata oluştu."}
                        </Typography>
                    </Stack>
                )}

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                    <Button startIcon={<Replay />} onClick={() => location.reload()} variant="outlined"
                        sx={{ borderColor: "#D4AF37", color: "#D4AF37", "&:hover": { borderColor: "#FFD700", backgroundColor: "rgba(212,175,55,0.08)" } }}
                    >
                        Sayfayı Yenile
                    </Button>
                    <Button component={Link} to="/" startIcon={<Home />} variant="contained"
                        sx={{ background: "linear-gradient(45deg, #D4AF37, #FFD700)", color: "black", fontWeight: 700,
                            "&:hover": { background: "linear-gradient(45deg, #B8941F, #E6C200)" } }}
                    >
                        Ana Sayfa
                    </Button>
                    <Button startIcon={<SupportAgent />} href="mailto:support@example.com" variant="contained"
                        sx={{ background: "linear-gradient(45deg, #D4AF37, #FFD700)", color: "black", fontWeight: 700,
                            "&:hover": { background: "linear-gradient(45deg, #B8941F, #E6C200)" } }}
                    >
                        Destek ile İletişim
                    </Button>
                </Stack>
            </Stack>
        </Container>
    )
}