import { 
    Box, 
    Typography, 
    Container, 
    Grid2, 
    Paper,
    Stack,
    TextField,
    Button,
    Card,
    CardContent,
    Divider
} from "@mui/material";
import { 
    LocationOn,
    Phone,
    Email,
    AccessTime,
    Send,
    WhatsApp,
    Instagram,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import requests from "../api/requests";
import SEOHead from "../components/SEOHead";

export default function ContactPage() {
    const [content, setContent] = useState("");

    useEffect(() => {
        async function loadContent() {
            try {
                const data = await requests.Content.get("contact");
                setContent(data.value);
            } catch {
                setContent("İletişim bilgileri yüklenemedi.");
            }
        }
        loadContent();
    }, []);
    const contactInfo = [
        {
            icon: <LocationOn sx={{ fontSize: 40, color: "#D4AF37" }} />,
            title: "Adres",
            content: "Gül&Ra Kuyumculuk",
            details: "50. Yıl, Orhangazi Cd 48A, 34260\nİstanbul/Sultangazi"
        },
        {
            icon: <Phone sx={{ fontSize: 40, color: "#D4AF37" }} />,
            title: "Telefon",
            content: "+90 (541) 129 24 61",
            details: "WhatsApp: +90 (541) 129 24 61"
        },
        {
            icon: <Email sx={{ fontSize: 40, color: "#D4AF37" }} />,
            title: "E-posta",
            content: "info@gulra.com.tr",
            details: "destek@gulra.com.tr"
        },
        {
            icon: <AccessTime sx={{ fontSize: 40, color: "#D4AF37" }} />,
            title: "Çalışma Saatleri",
            content: "Pazartesi - Cumartesi: 08:00 - 18:00",
            details: "Pazar: Kapalı"
        }
    ];

    const socialMedia = [
        { icon: <WhatsApp />, name: "WhatsApp", link: "https://wa.me/905411292461", color: "#25D366" },
        { icon: <Instagram />, name: "Instagram", link: "https://instagram.com/gulrakuyumculuk", color: "#E4405F" }
    ];

    return (
        <Box>
            <SEOHead 
                pageKey="contact"
                title="İletişim - GUL&RA Kuyumcu"
                description="Mücevher ihtiyaçlarınız için bizimle iletişime geçin. Uzman ekibimiz size yardımcı olmaya hazır."
                keywords="iletişim, adres, telefon, randevu"
            />
            {/* Hero Section */}
            <Box
                sx={{
                    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                    color: "white",
                    py: 12,
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                <Container maxWidth="lg">
                    <Grid2 container spacing={4} alignItems="center">
                        <Grid2 size={{ xs: 12, md: 8 }}>
                            <Typography variant="h2" component="h1" sx={{ 
                                fontWeight: 700, 
                                mb: 3,
                                background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                İletişim
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}>
                                {content || "Size nasıl yardımcı olabiliriz? Sorularınız, özel tasarım talepleriniz veya randevu almak için bizimle iletişime geçin."}
                            </Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <Box sx={{ textAlign: "center" }}>
                                <Phone sx={{ fontSize: 120, color: "#D4AF37", opacity: 0.3 }} />
                            </Box>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>

            {/* Contact Info Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" component="h2" textAlign="center" sx={{ mb: 6, fontWeight: 600 }}>
                    İletişim Bilgileri
                </Typography>
                
                <Grid2 container spacing={4}>
                    {contactInfo.map((info, index) => (
                        <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 4,
                                    textAlign: "center",
                                    height: "100%",
                                    transition: "transform 0.3s ease-in-out",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: 6
                                    }
                                }}
                            >
                                <Box sx={{ mb: 3 }}>
                                    {info.icon}
                                </Box>
                                <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                                    {info.title}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1, whiteSpace: "pre-line" }}>
                                    {info.content}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {info.details}
                                </Typography>
                            </Paper>
                        </Grid2>
                    ))}
                </Grid2>
            </Container>

            {/* Contact Form Section */}
            <Box sx={{ backgroundColor: "#f8f9fa", py: 8 }}>
                <Container maxWidth="lg">
                    <Grid2 container spacing={6}>
                        {/* Contact Form */}
                        <Grid2 size={{ xs: 12, md: 8 }}>
                            <Paper elevation={3} sx={{ p: 6 }}>
                                <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 600 }}>
                                    Mesaj Gönder
                                </Typography>
                                
                                <Stack spacing={3}>
                                    <Grid2 container spacing={2}>
                                        <Grid2 size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Ad Soyad"
                                                variant="outlined"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        "&:hover fieldset": {
                                                            borderColor: "#D4AF37",
                                                        },
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: "#D4AF37",
                                                        },
                                                    },
                                                    "& .MuiInputLabel-root.Mui-focused": {
                                                        color: "#D4AF37",
                                                    },
                                                }}
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="E-posta"
                                                type="email"
                                                variant="outlined"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        "&:hover fieldset": {
                                                            borderColor: "#D4AF37",
                                                        },
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: "#D4AF37",
                                                        },
                                                    },
                                                    "& .MuiInputLabel-root.Mui-focused": {
                                                        color: "#D4AF37",
                                                    },
                                                }}
                                            />
                                        </Grid2>
                                    </Grid2>
                                    
                                    <TextField
                                        fullWidth
                                        label="Telefon"
                                        variant="outlined"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "&:hover fieldset": {
                                                    borderColor: "#D4AF37",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#D4AF37",
                                                },
                                            },
                                            "& .MuiInputLabel-root.Mui-focused": {
                                                color: "#D4AF37",
                                            },
                                        }}
                                    />
                                    
                                    <TextField
                                        fullWidth
                                        label="Konu"
                                        variant="outlined"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "&:hover fieldset": {
                                                    borderColor: "#D4AF37",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#D4AF37",
                                                },
                                            },
                                            "& .MuiInputLabel-root.Mui-focused": {
                                                color: "#D4AF37",
                                            },
                                        }}
                                    />
                                    
                                    <TextField
                                        fullWidth
                                        label="Mesajınız"
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "&:hover fieldset": {
                                                    borderColor: "#D4AF37",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#D4AF37",
                                                },
                                            },
                                            "& .MuiInputLabel-root.Mui-focused": {
                                                color: "#D4AF37",
                                            },
                                        }}
                                    />
                                    
                                    <Button
                                        variant="contained"
                                        size="large"
                                        startIcon={<Send />}
                                        sx={{
                                            background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                            color: "black",
                                            fontWeight: 600,
                                            py: 2,
                                            "&:hover": {
                                                background: "linear-gradient(45deg, #B8941F, #E6C200)"
                                            }
                                        }}
                                    >
                                        Mesaj Gönder
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid2>

                        {/* Additional Info */}
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <Stack spacing={3}>
                                {/* Social Media */}
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                            Sosyal Medya
                                        </Typography>
                                        <Stack spacing={2}>
                                            {socialMedia.map((social, index) => (
                                                <Button
                                                    key={index}
                                                    variant="outlined"
                                                    startIcon={social.icon}
                                                    fullWidth
                                                    href={social.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{
                                                        borderColor: social.color,
                                                        color: social.color,
                                                        "&:hover": {
                                                            borderColor: social.color,
                                                            backgroundColor: `${social.color}15`
                                                        }
                                                    }}
                                                >
                                                    {social.name}
                                                </Button>
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>

                                {/* Quick Contact */}
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                            Hızlı İletişim
                                        </Typography>
                                        <Stack spacing={2}>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ color: "#D4AF37", fontWeight: 600 }}>
                                                    Telefon
                                                </Typography>
                                                <Typography variant="body2">
                                                    +90 (541) 129 24 61
                                                </Typography>
                                            </Box>
                                            <Divider />
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ color: "#D4AF37", fontWeight: 600 }}>
                                                    WhatsApp Destek
                                                </Typography>
                                                <Typography variant="body2">
                                                    7/24 Aktif
                                                </Typography>
                                            </Box>
                                            <Divider />
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ color: "#D4AF37", fontWeight: 600 }}>
                                                    E-posta Yanıt Süresi
                                                </Typography>
                                                <Typography variant="body2">
                                                    24 saat içinde
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>

                                {/* Store Hours */}
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                            Mağaza Saatleri
                                        </Typography>
                                        <Stack spacing={1}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="body2">Pazartesi - Cumartesi</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>08:00 - 18:00</Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="body2">Pazar</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 600, color: "error.main" }}>Kapalı</Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="body2">Resmi Tatiller</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 600, color: "error.main" }}>Kapalı</Typography>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>

            {/* Map Section */}
            <Box sx={{ py: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" textAlign="center" sx={{ mb: 6, fontWeight: 600 }}>
                        Konumumuz
                    </Typography>
                    <Paper elevation={3} sx={{ height: 400, borderRadius: 3, overflow: "hidden" }}>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.0080796782718!2d28.870405899999998!3d41.0906701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab1958dcc7685%3A0x7eea68822bbccefc!2sG%C3%BCl%26Ra%20Kuyumculuk!5e0!3m2!1str!2str!4v1758409825765!5m2!1str!2str" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Gül&Ra Kuyumculuk Konumu"
                        />
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
}
