import { useEffect, useMemo, useState } from "react";
import ProductList from "./ProductList";
import { CircularProgress, Container, Typography, Box, Paper, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Stack, Chip } from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProducts, productSelector } from "./catalogSlice";
import SEOHead from "../../components/SEOHead";

export default function CatalogPage() {

    const { status, isLoaded } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();
    const products = useAppSelector(productSelector.selectAll)
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    const [priceRange, setPriceRange] = useState("all");
    
    useEffect(() => {
        if (!isLoaded) {
            dispatch(fetchProducts());
        }
    }, [isLoaded]);

    const filteredProducts = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        // Category keyword mapping (TR + EN fallbacks)
        const categoryKeywords: Record<string, string[]> = {
            rings: ["yüzük", "ring"],
            necklaces: ["kolye", "necklace"],
            earrings: ["küpe", "earring"],
            bracelets: ["bilezik", "bracelet"],
        };

        const matchCategory = (name?: string, description?: string) => {
            if (category === "all") return true;
            const keywords = categoryKeywords[category] ?? [];
            const text = `${name ?? ""} ${description ?? ""}`.toLowerCase();
            return keywords.some(k => text.includes(k));
        };

        const matchPrice = (price?: number) => {
            if (price == null) return false;
            if (priceRange === "all") return true;
            if (priceRange === "0-5000") return price >= 0 && price <= 5000;
            if (priceRange === "5000-15000") return price > 5000 && price <= 15000;
            if (priceRange === "15000-30000") return price > 15000 && price <= 30000;
            if (priceRange === "30000+") return price > 30000;
            return true;
        };

        return products.filter(p => {
            const text = `${p.name ?? ""} ${p.description ?? ""}`.toLowerCase();
            const matchesSearch = term === "" || text.includes(term);
            return matchesSearch && matchCategory(p.name, p.description) && matchPrice(Number(p.price));
        });
    }, [products, searchTerm, category, priceRange]);

    if (status === "pendingFetchProducts") {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                <CircularProgress size={60} sx={{ color: "#D4AF37" }} />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <SEOHead 
                pageKey="products"
                title="Ürünlerimiz - GUL&RA Kuyumcu"
                description="Özenle seçilmiş mücevher koleksiyonumuz. Yüzük, kolye, küpe ve daha fazlası."
                keywords="ürünler, mücevher koleksiyonu, katalog"
            />
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" component="h1" sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}>
                    Kuyumcu Koleksiyonu
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                    En kaliteli altın, elmas ve değerli taşlarla hazırlanmış özel tasarım mücevherler
                </Typography>
                
                {/* Filter and Search Bar */}
                <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
                        <TextField
                            fullWidth
                            placeholder="Ürün ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: "#D4AF37" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "&:hover fieldset": {
                                        borderColor: "#D4AF37",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#D4AF37",
                                    },
                                }
                            }}
                        />
                        <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel>Kategori</InputLabel>
                            <Select
                                label="Kategori"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <FilterList sx={{ color: "#D4AF37", ml: 1 }} />
                                    </InputAdornment>
                                }
                                sx={{
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D4AF37",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D4AF37",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D4AF37",
                                    },
                                }}
                            >
                                <MenuItem value="all">Tümü</MenuItem>
                                <MenuItem value="rings">Yüzükler</MenuItem>
                                <MenuItem value="necklaces">Kolyeler</MenuItem>
                                <MenuItem value="earrings">Küpeler</MenuItem>
                                <MenuItem value="bracelets">Bilezikler</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel>Fiyat</InputLabel>
                            <Select
                                label="Fiyat"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D4AF37",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D4AF37",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D4AF37",
                                    },
                                }}
                            >
                                <MenuItem value="all">Tümü</MenuItem>
                                <MenuItem value="0-5000">₺0 - ₺5.000</MenuItem>
                                <MenuItem value="5000-15000">₺5.000 - ₺15.000</MenuItem>
                                <MenuItem value="15000-30000">₺15.000 - ₺30.000</MenuItem>
                                <MenuItem value="30000+">₺30.000+</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Paper>

                {/* Results Summary */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                        {filteredProducts.length} ürün bulundu
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Chip label="Yeni Ürünler" size="small" sx={{ backgroundColor: "#D4AF37", color: "black" }} />
                        <Chip label="Özel Fiyat" size="small" sx={{ backgroundColor: "#FFD700", color: "black" }} />
                    </Stack>
                </Stack>
            </Box>

            {/* Product List */}
            <ProductList products={filteredProducts} />
        </Container>
    );
}