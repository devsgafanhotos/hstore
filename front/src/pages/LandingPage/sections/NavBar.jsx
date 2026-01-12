import { ShoppingBag } from "lucide-react";
import {
    AppBar,
    Toolbar,
    useTheme,
    useMediaQuery,
    Container,
    Typography,
    Box,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import {
    ArrowDownwardSharp,
    ExpandLess,
    ExpandMore,
} from "@mui/icons-material";
import { useState } from "react";
import MyButton from "../../../components/form/MyButton";
import MyLinkButton from "../../../components/form/MyLinkButton";
export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const navItems = [
        { text: "Smartphones" },
        { text: "Computadores" },
        { text: "Unitel" },
        { text: "Contactos" },
        { text: "Entrar", link: "/login" },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box
            sx={{
                backgroundColor: "primary.main",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid #eee",
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    disableGutters
                    sx={{ justifyContent: "space-between" }}
                >
                    {/* Logo */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 900,
                            color: "Background",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        H-STORE
                        <Box
                            component="span"
                            sx={{
                                width: 10,
                                height: 8,
                                bgcolor: "secondary.main",
                                borderRadius: "20px",
                            }}
                        />
                    </Typography>

                    {/* Desktop Nav */}
                    {!isMobile && (
                        <List sx={{ display: "flex", gap: 4 }}>
                            {navItems.map((item) => (
                                <ListItem>
                                    <ListItemButton>
                                        {!item?.link ? (
                                            <ListItemText
                                                sx={{
                                                    cursor: "pointer",
                                                    color: "text.primary",
                                                    fontWeight: 500,
                                                    textDecoration: "none",
                                                    "&:hover": {
                                                        color: "secondary.main",
                                                    },
                                                }}
                                                primary={item.text}
                                            />
                                        ) : (
                                            <MyLinkButton
                                                to={item.link}
                                                title={item.text}
                                            />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    )}
                    {isMobile && (
                        <MyButton
                            type="text"
                            sx={{ backgroundColor: "transparent" }}
                            handleClick={handleDrawerToggle}
                        >
                            <ExpandMore sx={{ fontSize: 30 }} />
                            <ExpandLess sx={{ fontSize: 30 }} />
                        </MyButton>
                    )}
                </Toolbar>
            </Container>
        </Box>
    );
}
