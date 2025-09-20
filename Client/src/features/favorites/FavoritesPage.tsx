import { Container, Typography, Box } from "@mui/material";
import { useMemo } from "react";
import { useAppSelector } from "../../store/store";
import { productSelector } from "../catalog/catalogSlice";
import ProductList from "../catalog/ProductList";
import { getFavoriteIds } from "../../utils/favorites";

export default function FavoritesPage() {
    const products = useAppSelector(productSelector.selectAll);
    const favoriteIds = useMemo(() => getFavoriteIds(), []);
    const favoriteProducts = products.filter(p => favoriteIds.includes(p.id));

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" sx={{
                fontWeight: 700,
                mb: 3,
                background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
            }}>
                Favorilerim
            </Typography>

            {favoriteProducts.length === 0 ? (
                <Box sx={{ textAlign: "center", color: "text.secondary" }}>
                    Henüz favori ürününüz yok.
                </Box>
            ) : (
                <ProductList products={favoriteProducts} />
            )}
        </Container>
    );
}


