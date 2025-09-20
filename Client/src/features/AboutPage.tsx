import { 
    Box, 
    Typography, 
    Container, 
    Grid2, 
    Paper,
    Stack,
    Avatar,
    Divider
} from "@mui/material";
import { 
    LocalShipping,
    Security,
    Support,
    Diamond,
    Verified,
    EmojiEvents,
    History,
    Group
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import requests from "../api/requests";
import SEOHead from "../components/SEOHead";

export default function AboutPage() {
    const [content, setContent] = useState("");

    useEffect(() => {
        async function loadContent() {
            try {
                const data = await requests.Content.get("about");
                setContent(data.value);
            } catch {
                setContent("İçerik yüklenemedi.");
            }
        }
        loadContent();
    }, []);
    const features = [
        {
            icon: <LocalShipping sx={{ fontSize: 50, color: "#D4AF37" }} />,
            title: "Ücretsiz Kargo",
            description: "500 TL ve üzeri alışverişlerde ücretsiz kargo hizmeti sunuyoruz. Türkiye'nin her yerine güvenli teslimat."
        },
        {
            icon: <Security sx={{ fontSize: 50, color: "#D4AF37" }} />,
            title: "Güvenli Alışveriş",
            description: "SSL sertifikası ve 256-bit şifreleme ile güvenli ödeme. Kredi kartı bilgileriniz tamamen korunur."
        },
        {
            icon: <Support sx={{ fontSize: 50, color: "#D4AF37" }} />,
            title: "7/24 Müşteri Desteği",
            description: "Uzman müşteri hizmetleri ekibimiz size her zaman yardımcı olmaya hazır."
        },
        {
            icon: <Verified sx={{ fontSize: 50, color: "#D4AF37" }} />,
            title: "Sertifikalı Ürünler",
            description: "Tüm ürünlerimiz uluslararası kalite sertifikalarına sahip ve garanti kapsamındadır."
        },
        {
            icon: <EmojiEvents sx={{ fontSize: 50, color: "#D4AF37" }} />,
            title: "Ödüllü Tasarımlar",
            description: "Tasarımcılarımız ulusal ve uluslararası yarışmalarda ödül almış deneyimli sanatçılardır."
        },
        {
            icon: <History sx={{ fontSize: 50, color: "#D4AF37" }} />,
            title: "30 Yıllık Deneyim",
            description: "1994'ten beri kuyumculuk sektöründe hizmet veren köklü bir aile şirketiyiz."
        }
    ];

    const team = [
        {
            name: "Berkay OMAK",
            title: "Kurucu & Baş Tasarımcı",
            image: "/api/placeholder/150/150",
            description: "Kuyumculuk sanatının ustası ve GUL&RA'nın kurucusu"
        }
    ];

    return (
        <Box>
            <SEOHead 
                pageKey="about"
                title="Hakkımızda - GUL&RA Kuyumcu"
                description="1994'ten beri mücevher sanatının en ince detaylarını işleyen köklü aile şirketi."
                keywords="hakkımızda, kuyumcu tarihi, deneyim, kalite"
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
                                GUL&RA Kuyumcu
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}>
                                {content || "1994'ten beri mücevher sanatının en ince detaylarını işleyen, kalite ve güveni bir arada sunan köklü bir aile şirketi."}
                            </Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    position: "relative"
                                }}
                            >
                                <Diamond sx={{ fontSize: 200, color: "#D4AF37", opacity: 0.3 }} />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        textAlign: "center"
                                    }}
                                >
                                    <Typography variant="h3" sx={{ color: "#D4AF37", fontWeight: 700, mb: 1 }}>
                                        30+
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: "white" }}>
                                        Yıllık Deneyim
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" component="h2" textAlign="center" sx={{ mb: 2, fontWeight: 600 }}>
                    Neden GUL&RA?
                </Typography>
                <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
                    Size güven veren özelliklerimiz
                </Typography>
                
                <Grid2 container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid2 key={index} size={{ xs: 12, md: 6, lg: 4 }}>
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
                                    {feature.icon}
                                </Box>
                                <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                    {feature.description}
                                </Typography>
                            </Paper>
                        </Grid2>
                    ))}
                </Grid2>
            </Container>

            {/* Team Section */}
            <Box sx={{ backgroundColor: "#f8f9fa", py: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" component="h2" textAlign="center" sx={{ mb: 2, fontWeight: 600 }}>
                        Ekibimiz
                    </Typography>
                    <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
                        Deneyimli ve tutkulu ekibimizle sizin için çalışıyoruz
                    </Typography>
                    
                    <Grid2 container spacing={4} justifyContent="center">
                        {team.map((member, index) => (
                            <Grid2 key={index} size={{ xs: 12, md: 4 }}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 4,
                                        textAlign: "center",
                                        transition: "transform 0.3s ease-in-out",
                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                            boxShadow: 4
                                        }
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            mx: "auto",
                                            mb: 3,
                                            backgroundColor: "#D4AF37",
                                            fontSize: "2rem"
                                        }}
                                    >
                                        <Group sx={{ fontSize: 60 }} />
                                    </Avatar>
                                    <Typography variant="h5" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                                        {member.name}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: "#D4AF37", mb: 2, fontWeight: 500 }}>
                                        {member.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {member.description}
                                    </Typography>
                                </Paper>
                            </Grid2>
                        ))}
                    </Grid2>
                </Container>
            </Box>

            {/* Values Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid2 container spacing={6} alignItems="center">
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                            Değerlerimiz
                        </Typography>
                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="h6" sx={{ mb: 1, color: "#D4AF37", fontWeight: 600 }}>
                                    Kalite
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Her üretim aşamasında en yüksek kalite standartlarını uygular, 
                                    sadece en iyi malzemeleri kullanırız.
                                </Typography>
                            </Box>
                            <Divider />
                            <Box>
                                <Typography variant="h6" sx={{ mb: 1, color: "#D4AF37", fontWeight: 600 }}>
                                    Güven
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    30 yıllık deneyimimizle müşterilerimizin güvenini kazanmış, 
                                    şeffaf ve dürüst bir hizmet anlayışı benimser.
                                </Typography>
                            </Box>
                            <Divider />
                            <Box>
                                <Typography variant="h6" sx={{ mb: 1, color: "#D4AF37", fontWeight: 600 }}>
                                    İnovasyon
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Geleneksel işçiliği modern teknoloji ile harmanlayarak, 
                                    çağın gereksinimlerine uygun çözümler üretir.
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                                borderRadius: 4,
                                p: 6,
                                textAlign: "center",
                                color: "black"
                            }}
                        >
                            <Diamond sx={{ fontSize: 80, mb: 2, opacity: 0.8 }} />
                            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                                Misyonumuz
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                Her müşterimizin özel anlarını değerli kılacak, 
                                kuşaktan kuşağa aktarılabilecek kalitede mücevherler üretmek 
                                ve mücevher sanatını gelecek nesillere taşımaktır.
                            </Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    );
}