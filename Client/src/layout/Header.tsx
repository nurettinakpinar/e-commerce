import { KeyboardArrowDown, ShoppingCart, Diamond, Menu as MenuIcon, Close } from "@mui/icons-material";
import { 
    AppBar, 
    Badge, 
    Box, 
    Button, 
    Container, 
    IconButton, 
    Menu, 
    MenuItem, 
    Stack, 
    Toolbar, 
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme,
    useMediaQuery
} from "@mui/material";
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
    fontWeight: 500,
    "&:hover": {
        color: "#D4AF37",
        backgroundColor: "rgba(212, 175, 55, 0.1)"
    },
    transition: "all 0.3s ease"
}

export default function Header() {

    const { cart } = useAppSelector(state => state.cart);
    const { user } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const itemCount = cart?.cartItems.reduce((total, item) => total + item.quantity, 0);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    function handleMenuClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setMobileDrawerOpen(open);
    };

    const drawerContent = (
        <Box sx={{ width: 250, pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 2 }}>
                <Typography variant="h6" sx={{ color: "#D4AF37", fontWeight: 700 }}>
                    GUL&RA
                </Typography>
                <IconButton onClick={toggleDrawer(false)}>
                    <Close />
                </IconButton>
            </Box>
            <List>
                {links.map((link) => (
                    <ListItem key={link.to} disablePadding>
                        <ListItemButton 
                            component={NavLink} 
                            to={link.to}
                            onClick={toggleDrawer(false)}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "rgba(212, 175, 55, 0.1)"
                                }
                            }}
                        >
                            <ListItemText 
                                primary={link.title}
                                sx={{
                                    "& .MuiListItemText-primary": {
                                        fontWeight: 500
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
                {!user && authLinks.map((link) => (
                    <ListItem key={link.to} disablePadding>
                        <ListItemButton 
                            component={NavLink} 
                            to={link.to}
                            onClick={toggleDrawer(false)}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "rgba(212, 175, 55, 0.1)"
                                }
                            }}
                        >
                            <ListItemText 
                                primary={link.title}
                                sx={{
                                    "& .MuiListItemText-primary": {
                                        fontWeight: 500
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar 
                position="static" 
                sx={{ 
                    mb: 4, 
                    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {/* Logo Section */}
                            <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
                                <Diamond sx={{ color: "#D4AF37", mr: 1, fontSize: 28 }} />
                                <Typography 
                                    variant="h5" 
                                    sx={{ 
                                        cursor: "pointer", 
                                        textDecoration: "none", 
                                        color: "inherit",
                                        fontWeight: 700,
                                        background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                    }} 
                                    component={NavLink} 
                                    to="/"
                                >
                                    GUL&RA
                                </Typography>
                            </Box>

                            {/* Desktop Navigation */}
                            {!isMobile && (
                                <Stack direction="row" spacing={1}>
                                    {links.map(link => (
                                        <Button 
                                            key={link.to} 
                                            component={NavLink} 
                                            to={link.to} 
                                            sx={{
                                                ...navStyles,
                                                px: 2,
                                                py: 1,
                                                borderRadius: 2
                                            }}
                                        >
                                            {link.title}
                                        </Button>
                                    ))}
                                </Stack>
                            )}
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {/* Cart Icon */}
                            <IconButton 
                                component={Link} 
                                to="/cart" 
                                size="large" 
                                sx={{
                                    mr: 2,
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "rgba(212, 175, 55, 0.1)",
                                        color: "#D4AF37"
                                    }
                                }}
                            >
                                <Badge 
                                    badgeContent={itemCount} 
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            backgroundColor: "#D4AF37",
                                            color: "black",
                                            fontWeight: 600
                                        }
                                    }}
                                >
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>

                            {/* User Menu */}
                            {user ? (
                                <>
                                    <Button 
                                        id="user-button" 
                                        onClick={handleMenuClick} 
                                        endIcon={<KeyboardArrowDown />} 
                                        sx={{
                                            ...navStyles,
                                            px: 2,
                                            py: 1,
                                            borderRadius: 2
                                        }}
                                    >
                                        {user.name}
                                    </Button>
                                    <Menu
                                        id="user-menu" 
                                        anchorEl={anchorEl} 
                                        open={Boolean(anchorEl)} 
                                        onClose={handleClose}
                                        sx={{
                                            "& .MuiPaper-root": {
                                                backgroundColor: "#2d2d2d",
                                                color: "white",
                                                border: "1px solid #D4AF37"
                                            }
                                        }}
                                    >
                {user?.roles?.includes("Admin") && (
                    <MenuItem 
                        component={Link} 
                        to="/admin" 
                        onClick={handleClose}
                        sx={{
                            "&:hover": {
                                backgroundColor: "rgba(212, 175, 55, 0.1)"
                            }
                        }}
                    >
                        Admin Panel
                    </MenuItem>
                )}
                <MenuItem 
                                            component={Link} 
                                            to="/orders" 
                                            onClick={handleClose}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "rgba(212, 175, 55, 0.1)"
                                                }
                                            }}
                                        >
                                            Siparişlerim
                                        </MenuItem>
                                        <MenuItem 
                                            component={Link} 
                                            to="/favorites" 
                                            onClick={handleClose}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "rgba(212, 175, 55, 0.1)"
                                                }
                                            }}
                                        >
                                            Favorilerim
                                        </MenuItem>
                                        <MenuItem 
                                            onClick={() => {
                                                dispatch(logout());
                                                dispatch(clearCart());
                                                handleClose();
                                            }}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "rgba(212, 175, 55, 0.1)"
                                                }
                                            }}
                                        >
                                            Çıkış yap
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    {!isMobile && (
                                        <Stack direction="row" spacing={1}>
                                            {authLinks.map(link => (
                                                <Button 
                                                    key={link.to} 
                                                    component={NavLink} 
                                                    to={link.to} 
                                                    sx={{
                                                        ...navStyles,
                                                        px: 2,
                                                        py: 1,
                                                        borderRadius: 2
                                                    }}
                                                >
                                                    {link.title}
                                                </Button>
                                            ))}
                                        </Stack>
                                    )}
                                </>
                            )}

                            {/* Mobile Menu Button */}
                            {isMobile && (
                                <IconButton
                                    onClick={toggleDrawer(true)}
                                    sx={{
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "rgba(212, 175, 55, 0.1)",
                                            color: "#D4AF37"
                                        }
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileDrawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    "& .MuiDrawer-paper": {
                        backgroundColor: "#1a1a1a",
                        color: "white"
                    }
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
}