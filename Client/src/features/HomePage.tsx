import { 
    Box, 
    Typography, 
    Button, 
    Container, 
    Grid2, 
    Card, 
    CardContent, 
    CardMedia,
    Stack,
    Chip,
    IconButton,
    CircularProgress
} from "@mui/material";
import { Link } from "react-router";
import { 
    Diamond, 
    Favorite, 
    Star
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store/store";
import SEOHead from "../components/SEOHead";
import { useEffect } from "react";
import { fetchProducts, productSelector } from "../features/catalog/catalogSlice";
import { currencyTRY } from "../utils/formatCurrency";

export default function HomePage() {
    const dispatch = useAppDispatch();
    const { status, isLoaded } = useAppSelector(state => state.catalog);
    const products = useAppSelector(productSelector.selectAll);

    useEffect(() => {
        if (!isLoaded) {
            dispatch(fetchProducts());
        }
    }, [isLoaded, dispatch]);

    // İlk 3 ürünü öne çıkan olarak göster
    const featuredProducts = products.slice(0, 3);

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
                <Container maxWidth="lg">
                    <Grid2 container spacing={4} alignItems="center">
                        <Grid2 size={{ xs: 12, md: 6 }}>
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
                        <Grid2 size={{ xs: 12, md: 6 }}>
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
                <Container maxWidth="lg">
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
                        <Grid2 container spacing={4}>
                            {featuredProducts.map((product, index) => (
                                <Grid2 key={product.id} size={{ xs: 12, md: 4 }}>
                                    <Card
                                        sx={{
                                            height: "100%",
                                            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                            "&:hover": {
                                                transform: "translateY(-8px)",
                                                boxShadow: 8
                                            }
                                        }}
                                    >
                                        <Box sx={{ position: "relative" }}>
                                            <CardMedia
                                                component="img"
                                                height="300"
                                                image={`http://localhost:5298/images/${product.imageUrl}`}
                                                alt={product.name}
                                                sx={{ objectFit: "cover" }}
                                            />
                                            <Chip
                                                label={index === 0 ? "Yeni" : index === 1 ? "Popüler" : "Özel"}
                                                size="small"
                                                sx={{
                                                    position: "absolute",
                                                    top: 16,
                                                    right: 16,
                                                    backgroundColor: "#D4AF37",
                                                    color: "black",
                                                    fontWeight: 600
                                                }}
                                            />
                                            <IconButton
                                                sx={{
                                                    position: "absolute",
                                                    top: 16,
                                                    left: 16,
                                                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                                                    "&:hover": {
                                                        backgroundColor: "rgba(255, 255, 255, 1)"
                                                    }
                                                }}
                                            >
                                                <Favorite sx={{ color: "#D4AF37" }} />
                                            </IconButton>
                                        </Box>
                                        <CardContent>
                                            <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                                                {product.name}
                                            </Typography>
                                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                                <Star sx={{ color: "#FFD700", fontSize: 20 }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    {(4.5 + Math.random() * 0.5).toFixed(1)}
                                                </Typography>
                                            </Stack>
                                            <Typography variant="h5" sx={{ color: "#D4AF37", fontWeight: 700 }}>
                                                {currencyTRY.format(product.price)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
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
                <Container maxWidth="md" sx={{ textAlign: "center" }}>
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
