import { 
    Box, 
    Typography, 
    Button, 
    Container, 
    Grid2, 
    Stack,
    CircularProgress
} from "@mui/material";
import { Link } from "react-router";
import { 
    Diamond, 
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store/store";
import SEOHead from "../components/SEOHead";
import { useEffect } from "react";
import { fetchProducts, productSelector } from "../features/catalog/catalogSlice";
import Product from "./catalog/Product";

export default function HomePage() {
    const dispatch = useAppDispatch();
    const { status, isLoaded } = useAppSelector(state => state.catalog);
    const products = useAppSelector(productSelector.selectAll);

    useEffect(() => {
        if (!isLoaded) {
            dispatch(fetchProducts());
        }
    }, [isLoaded, dispatch]);

    // İlk 6 ürünü öne çıkan olarak göster
    const featuredProducts = products.slice(0, 6);

    return (
        <Box>
            <SEOHead 
                pageKey="home"
                title="GUL&RA Kuyumcu - Premium Mücevher ve Kuyumculuk"
                description="30 yıllık deneyimimizle en kaliteli mücevherler. Altın, gümüş, pırlanta ve değerli taş koleksiyonları."
                keywords="kuyumcu, mücevher, altın, gümüş, pırlanta, yüzük, kolye, küpe"
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
                <Container maxWidth="xl">
                    <Grid2 container spacing={6} alignItems="center" sx={{ px: 2 }}>
                        <Grid2 size={{ xs: 12, md: 7 }}>
                            <Typography variant="h2" component="h1" sx={{ 
                                fontWeight: 700, 
                                mb: 3,
                                background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                Lüks Kuyumcu Koleksiyonu
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}>
                                En kaliteli altın, elmas ve değerli taşlarla hazırlanmış 
                                özel tasarım mücevherler. Her parça bir sanat eseri.
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    component={Link}
                                    to="/catalog"
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                        color: "black",
                                        fontWeight: 600,
                                        px: 4,
                                        py: 1.5,
                                        "&:hover": {
                                            background: "linear-gradient(45deg, #B8941F, #E6C200)"
                                        }
                                    }}
                                >
                                    Koleksiyonu İncele
                                </Button>
                                <Button
                                    component={Link}
                                    to="/about"
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        borderColor: "#D4AF37",
                                        color: "#D4AF37",
                                        px: 4,
                                        py: 1.5,
                                        "&:hover": {
                                            borderColor: "#FFD700",
                                            backgroundColor: "rgba(212, 175, 55, 0.1)"
                                        }
                                    }}
                                >
                                    Hakkımızda
                                </Button>
                            </Stack>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 5 }}>
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
                                        background: "rgba(212, 175, 55, 0.1)",
                                        borderRadius: "50%",
                                        p: 2
                                    }}
                                >
                                    <Typography variant="h4" sx={{ color: "#D4AF37", fontWeight: 700 }}>
                                        GUL&RA
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>

            {/* Featured Products Section */}
            <Box sx={{ backgroundColor: "#f8f9fa", py: 8 }}>
                <Container maxWidth="xl">
                    <Typography variant="h3" component="h2" textAlign="center" sx={{ mb: 2, fontWeight: 600 }}>
                        Öne Çıkan Ürünler
                    </Typography>
                    <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
                        En popüler ve özel tasarım mücevherlerimiz
                    </Typography>
                    
                    {status === "pendingFetchProducts" ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                            <CircularProgress size={60} sx={{ color: "#D4AF37" }} />
                        </Box>
                    ) : (
                        <Grid2 container spacing={4} sx={{ px: 2 }}>
                            {featuredProducts.map((product) => (
                                <Grid2 key={product.id} size={{ xs: 12, sm: 6, md: 4, xl: 2 }}>
                                    <Product product={product} />
                                </Grid2>
                            ))}
                        </Grid2>
                    )}

                    <Box textAlign="center" sx={{ mt: 6 }}>
                        <Button
                            component={Link}
                            to="/catalog"
                            variant="contained"
                            size="large"
                            sx={{
                                background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                color: "black",
                                fontWeight: 600,
                                px: 6,
                                py: 2,
                                "&:hover": {
                                    background: "linear-gradient(45deg, #B8941F, #E6C200)"
                                }
                            }}
                        >
                            Tüm Ürünleri Gör
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box
                sx={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                    color: "black",
                    py: 8
                }}
            >
                <Container maxWidth="lg" sx={{ textAlign: "center" }}>
                    <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
                        Özel Tasarım Mücevherler
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.8 }}>
                        Hayalinizdeki mücevheri birlikte tasarlayalım. 
                        Uzman ekibimiz size özel parçalar oluşturur.
                    </Typography>
                    <Button
                        component={Link}
                        to="/contact"
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: "black",
                            color: "white",
                            fontWeight: 600,
                            px: 6,
                            py: 2,
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.8)"
                            }
                        }}
                    >
                        İletişime Geç
                    </Button>
                </Container>
            </Box>
        </Box>
    );
}
