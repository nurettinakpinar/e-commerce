import { 
    Container, 
    Paper, 
    Typography, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    ListItemButton,
    Divider,
    Grid2,
} from "@mui/material";
import { 
    Dashboard,
    Inventory,
    Category,
    Info,
    ContactMail,
    ShoppingCart,
    People,
    Search,
    Settings
} from "@mui/icons-material";
import { NavLink, Outlet, useLocation } from "react-router";

const menuItems = [
    { path: "/admin", icon: <Dashboard />, label: "Panel", exact: true },
    { path: "/admin/products", icon: <Inventory />, label: "Ürünler" },
    { path: "/admin/categories", icon: <Category />, label: "Kategoriler" },
    { path: "/admin/orders", icon: <ShoppingCart />, label: "Siparişler" },
    { path: "/admin/users", icon: <People />, label: "Kullanıcılar" },
    { path: "/admin/about", icon: <Info />, label: "Hakkımızda" },
    { path: "/admin/contact", icon: <ContactMail />, label: "İletişim" },
    { path: "/admin/seo", icon: <Search />, label: "SEO Ayarları" },
    { path: "/admin/settings", icon: <Settings />, label: "Ayarlar" },
];

export default function AdminLayout() {
    const location = useLocation();

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, color: "#D4AF37", fontWeight: 700 }}>
                Admin Panel
            </Typography>
            
            <Grid2 container spacing={3}>
                {/* Sidebar */}
                <Grid2 size={{ xs: 12, md: 3 }}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, color: "#D4AF37" }}>
                            Menü
                        </Typography>
                        <List>
                            {menuItems.map((item, index) => (
                                <div key={item.path}>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            component={NavLink}
                                            to={item.path}
                                            selected={item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)}
                                            sx={{
                                                borderRadius: 1,
                                                mb: 0.5,
                                                "&.active": {
                                                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                                                    color: "#D4AF37"
                                                },
                                                "&:hover": {
                                                    backgroundColor: "rgba(212, 175, 55, 0.05)"
                                                }
                                            }}
                                        >
                                            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.label} />
                                        </ListItemButton>
                                    </ListItem>
                                    {index < menuItems.length - 1 && index === 0 && <Divider sx={{ my: 1 }} />}
                                    {index === 4 && <Divider sx={{ my: 1 }} />}
                                    {index === 6 && <Divider sx={{ my: 1 }} />}
                                </div>
                            ))}
                        </List>
                    </Paper>
                </Grid2>

                {/* Main Content */}
                <Grid2 size={{ xs: 12, md: 9 }}>
                    <Paper elevation={3} sx={{ p: 3, minHeight: 600 }}>
                        <Outlet />
                    </Paper>
                </Grid2>
            </Grid2>
        </Container>
    )
}


