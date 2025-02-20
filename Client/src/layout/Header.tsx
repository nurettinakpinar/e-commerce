import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, Container, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../features/account/accountSlice";
import { clearCart } from "../features/cart/cartSlice";

const links = [
    { title: "Ana Sayfa", to: "/" },
    { title: "Ürünler", to: "/catalog" },
    { title: "Hakkımızda", to: "/about" },
    { title: "İletişim", to: "/contact" },
]

const authLinks = [
    { title: "Login", to: "/login" },
    { title: "Register", to: "/register" },
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
    const { user } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();

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
                        {
                            user ? (
                                <Stack direction="row">
                                    <Button sx={navStyles}>{user.name}</Button>
                                    <Button sx={navStyles} onClick={() => {
                                        dispatch(logout())
                                        dispatch(clearCart())
                                    }}>Çıkış Yap</Button>
                                </Stack>

                            ) : (
                                <Stack direction="row">
                                    {
                                        authLinks.map(link => (
                                            <Button key={link.to} component={NavLink} to={link.to} sx={navStyles}>
                                                {link.title}
                                            </Button>
                                        ))
                                    }
                                </Stack>
                            )
                        }


                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}