/* eslint-disable no-unused-vars */
import { useAuth } from "../../hooks/useAuth";
import {
    AppBar,
    Toolbar,
    useTheme,
    useMediaQuery,
    Typography,
    Box,
    IconButton,
    Avatar,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Badge,
    Tooltip,
} from "@mui/material";
import MyLinkButton from "../../components/form/MyLinkButton";
import { MenuOptions } from "../../utils/MenuOptions";
import { useNavigate } from "react-router-dom";
import { DollarSign, MenuIcon, Plus, UserIcon } from "lucide-react";
import { useAction } from "../../hooks/useAction";

export const drawerWidth = 275;
export default function Header({ drawerState }) {
    const { openDrawer, setOpenDrawer } = drawerState;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { user } = useAuth();

    function NewSellIcone() {
        if (!user) return;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { handleSell } = useAction();
        return (
            <Tooltip title="Nova Faturação">
                <IconButton size="small" onClick={() => handleSell(true)}>
                    <Badge badgeContent={<Plus size={10} />} color="secondary">
                        <DollarSign size={20} />
                    </Badge>
                </IconButton>
            </Tooltip>
        );
    }
    const navigate = useNavigate();

    const { NavBar: HeaderOptions } = MenuOptions;

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                bgcolor: "background.default",
                borderBottom: "1px solid #e2e8f0",
                color: "text.primary",
            }}
        >
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                {/* Ícone de abrir Drawer */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => setOpenDrawer(true)}
                    sx={{ mr: 2, display: { md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <span></span>

                {!isMobile && !user && (
                    <List
                        sx={{
                            padding: 0,
                            display: "flex",
                            gap: 2,
                        }}
                    >
                        {HeaderOptions.map((opt) => (
                            <ListItem key={opt.titulo}>
                                <ListItemButton sx={{ borderRadius: "5px" }}>
                                    <ListItemText
                                        primary={opt.titulo}
                                        sx={{
                                            "&:hover": {
                                                color: "secondary.main",
                                                transition: "ease-in-out",
                                                transitionDuration: ".2s",
                                            },
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}

                <Box sx={{ display: "flex" }}>
                    {user ? (
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                            }}
                        >
                            <NewSellIcone />

                            <Tooltip title="Perfil">
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        ml: 1,
                                        p: 0.5,
                                        borderRadius: 50,
                                        border: "1px solid #e2e8f0",
                                        bgcolor: "white",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => navigate("/perfil")}
                                >
                                    <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            bgcolor: "secondary.main",
                                        }}
                                    >
                                        {user?.nome[0] || <UserIcon />}
                                    </Avatar>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "block",
                                                paddingRight: 4,
                                            },
                                            color: "primary.main",
                                        }}
                                    >
                                        {user?.nome.split(" ")[0] || ""}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        </Box>
                    ) : (
                        <MyLinkButton to={"/login"} title={"Entrar"} />
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
