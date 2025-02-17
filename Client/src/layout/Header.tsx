import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, Container, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { useAppSelector } from "../hooks/hooks";

const links = [
    { title: "Ana Sayfa", to: "/" },
    { title: "Ürünler", to: "/catalog" },
    { title: "Hakkımızda", to: "/about" },
    { title: "İletişim", to: "/contact" },
]

const navStyles = {
    color: "inherit",
    textDecoration: "none",
    whiteSpace: "nowrap",
    "&:hover": {
        color: "text.primary"
    },
}

export default function Header() {

    const { cart } = useAppSelector(state => state.cart);
    const itemCount = cart?.cartItems.reduce((total, item) => total + item.quantity, 0);
    return (
        <AppBar position="static" sx={{ mb: 4, background: "#759841" }}>
            <Container>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} >
                    <Box sx={{ display: "flex", alignItems: "center" }} >
                        {/* Header Title */}
                        <Typography variant="h6" sx={{ mr: 2, cursor: "pointer", textDecoration: "none", color: "inherit" }} component={NavLink} to="/" >
                            GUL&RA
                        </Typography>

                        {/* List items */}
                        <Stack direction="row">
                            {
                                links.map(link => (
                                    <Button key={link.to} component={NavLink} to={link.to} sx={navStyles}>
                                        {link.title}
                                    </Button>
                                ))
                            }
                        </Stack>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton component={Link} to="/cart" size="large" edge="start" color="inherit"  >
                            <Badge badgeContent={itemCount} color="warning">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" edge="start" color="inherit" sx={{ marginLeft: 2 }}>
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}


