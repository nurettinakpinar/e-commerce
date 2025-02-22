import { KeyboardArrowDown, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../features/account/accountSlice";
import { clearCart } from "../features/cart/cartSlice";
import React, { useState } from "react";

const links = [
    { title: "Ana Sayfa", to: "/" },
    { title: "Ürünler", to: "/catalog" },
    { title: "Hakkımızda", to: "/about" },
    { title: "İletişim", to: "/contact" },
]

const authLinks = [
    { title: "Giriş Yap", to: "/login" },
    { title: "Kayıt Ol", to: "/register" },
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

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    function handleMenuClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <AppBar position="static" sx={{ mb: 4, background: "#759841" }}>
            <Container maxWidth="lg">
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
                                <>
                                    <Button id="user-button" onClick={handleMenuClick} endIcon={<KeyboardArrowDown />} sx={navStyles}>{user.name}</Button>
                                    <Menu
                                        id="user-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                        <MenuItem component={Link} to="/orders" onClick={() => handleClose()}>Siparişlerim</MenuItem>
                                        <MenuItem onClick={() => {
                                            dispatch(logout());
                                            dispatch(clearCart());
                                            handleClose();
                                        }}>Çıkış yap</MenuItem>
                                    </Menu>
                                </>

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