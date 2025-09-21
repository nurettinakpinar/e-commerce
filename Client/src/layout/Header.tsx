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
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1.5, px: 2 }}>
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
                                <Stack direction="row" spacing={2}>
                                    {links.map(link => (
                                        <Button 
                                            key={link.to} 
                                            component={NavLink} 
                                            to={link.to} 
                                            sx={{
                                                ...navStyles,
                                                px: 3,
                                                py: 1.5,
                                                borderRadius: 3,
                                                fontSize: "1rem",
                                                fontWeight: 600,
                                                textTransform: "none"
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
                                    mr: 3,
                                    color: "white",
                                    p: 1.5,
                                    borderRadius: 2,
                                    "&:hover": {
                                        backgroundColor: "rgba(212, 175, 55, 0.1)",
                                        color: "#D4AF37",
                                        transform: "scale(1.05)"
                                    },
                                    transition: "all 0.3s ease"
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
                                            px: 3,
                                            py: 1.5,
                                            borderRadius: 3,
                                            fontSize: "1rem",
                                            fontWeight: 600,
                                            textTransform: "none",
                                            border: "1px solid rgba(212, 175, 55, 0.3)",
                                            "&:hover": {
                                                backgroundColor: "rgba(212, 175, 55, 0.1)",
                                                borderColor: "#D4AF37",
                                                color: "#D4AF37"
                                            }
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
                                        <Stack direction="row" spacing={2}>
                                            <Button 
                                                component={NavLink} 
                                                to="/login"
                                                variant="outlined"
                                                sx={{
                                                    color: "white",
                                                    borderColor: "rgba(212, 175, 55, 0.5)",
                                                    px: 3,
                                                    py: 1.5,
                                                    borderRadius: 3,
                                                    fontSize: "1rem",
                                                    fontWeight: 600,
                                                    textTransform: "none",
                                                    "&:hover": {
                                                        borderColor: "#D4AF37",
                                                        backgroundColor: "rgba(212, 175, 55, 0.1)",
                                                        color: "#D4AF37"
                                                    }
                                                }}
                                            >
                                                Giriş Yap
                                            </Button>
                                            <Button 
                                                component={NavLink} 
                                                to="/register"
                                                variant="contained"
                                                sx={{
                                                    background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                                    color: "black",
                                                    px: 3,
                                                    py: 1.5,
                                                    borderRadius: 3,
                                                    fontSize: "1rem",
                                                    fontWeight: 600,
                                                    textTransform: "none",
                                                    "&:hover": {
                                                        background: "linear-gradient(45deg, #B8941F, #E6C200)",
                                                        transform: "translateY(-1px)",
                                                        boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)"
                                                    },
                                                    transition: "all 0.3s ease"
                                                }}
                                            >
                                                Kayıt Ol
                                            </Button>
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