import { useEffect, useState } from "react";
import { 
    Typography, 
    Grid2, 
    Paper, 
    Box, 
    Stack,
    Card,
    CardContent,
    LinearProgress
} from "@mui/material";
import { 
    TrendingUp, 
    People, 
    Inventory, 
    ShoppingCart,
    AttachMoney
} from "@mui/icons-material";
import requests from "../../api/requests";

interface Stats {
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
    totalRevenue: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ totalProducts: 0, totalOrders: 0, totalUsers: 0, totalRevenue: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStats() {
            try {
                const [products, orders] = await Promise.all([
                    requests.Catalog.list(),
                    requests.Order.getOrders()
                ]);
                
                setStats({
                    totalProducts: products.length,
                    totalOrders: orders.length,
                    totalUsers: 0, // Bu API endpoint'i henüz yok
                    totalRevenue: orders.reduce((sum: number, order: any) => sum + order.total, 0)
                });
            } catch (error) {
                console.error("Stats yüklenemedi:", error);
            } finally {
                setLoading(false);
            }
        }
        
        loadStats();
    }, []);

    const statCards = [
        {
            title: "Toplam Ürün",
            value: stats.totalProducts,
            icon: <Inventory sx={{ fontSize: 40, color: "#D4AF37" }} />,
            color: "#D4AF37"
        },
        {
            title: "Toplam Sipariş",
            value: stats.totalOrders,
            icon: <ShoppingCart sx={{ fontSize: 40, color: "#2196F3" }} />,
            color: "#2196F3"
        },
        {
            title: "Toplam Gelir",
            value: `₺${stats.totalRevenue.toLocaleString()}`,
            icon: <AttachMoney sx={{ fontSize: 40, color: "#4CAF50" }} />,
            color: "#4CAF50"
        },
        {
            title: "Aktif Kullanıcılar",
            value: stats.totalUsers || "N/A",
            icon: <People sx={{ fontSize: 40, color: "#FF9800" }} />,
            color: "#FF9800"
        }
    ];

    if (loading) {
        return (
            <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>Dashboard Yükleniyor...</Typography>
                <LinearProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Dashboard
            </Typography>
            
            <Grid2 container spacing={3}>
                {statCards.map((card, index) => (
                    <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card 
                            elevation={3}
                            sx={{
                                background: `linear-gradient(135deg, ${card.color}15 0%, ${card.color}05 100%)`,
                                border: `1px solid ${card.color}30`,
                                transition: "transform 0.2s",
                                "&:hover": {
                                    transform: "translateY(-2px)"
                                }
                            }}
                        >
                            <CardContent>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Box>{card.icon}</Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 700, color: card.color }}>
                                            {card.value}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {card.title}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>

            <Grid2 container spacing={3} sx={{ mt: 3 }}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                            <TrendingUp sx={{ mr: 1, color: "#D4AF37" }} />
                            Hızlı İşlemler
                        </Typography>
                        <Stack spacing={2}>
                            <Typography variant="body2" color="text.secondary">
                                • Yeni ürün ekle
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • Siparişleri kontrol et
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • İçerikleri güncelle
                            </Typography>
                        </Stack>
                    </Paper>
                </Grid2>
                
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2, color: "#D4AF37" }}>
                            Son Aktiviteler
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                                Henüz aktivite kaydı yok.
                            </Typography>
                        </Stack>
                    </Paper>
                </Grid2>
            </Grid2>
        </Box>
    );
}


