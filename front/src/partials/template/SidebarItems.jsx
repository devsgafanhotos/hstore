import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    Divider,
    LinearProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";

import { useAuth } from "../../hooks/useAuth";
import { MenuOptions } from "../../utils/MenuOptions";
import { ListIcon, LogOut } from "lucide-react";
import { drawerWidth } from "./Header";
import Logo from "../../components/Logo";

export default function SidebarItems({ onCloseDrawer }) {
    const { user } = useAuth();

    const SideBarOptions = MenuOptions?.[user?.role] || MenuOptions.Public;
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: drawerWidth,
                height: "100%",
                backgroundColor: "background.paper",
                borderRight: "1px solid",
                borderColor: "divider",
                padding: 0,
                display: "flex",
                flexDirection: "column",
            }}
            role="presentation"
        >
            <Toolbar
                sx={{ display: "flex", alignItems: "center", ml: -1, py: 2 }}
            >
                <Logo />
                <Typography
                    variant="caption"
                    sx={{
                        ml: 1,
                        color: "text.secondary",
                        border: "1px solid #e2e8f0",
                        px: 0.5,
                        borderRadius: 1,
                    }}
                >
                    {user?.nome.split(" ")[0].toUpperCase() || ""}
                </Typography>
            </Toolbar>
            <Divider />
            <List sx={{ px: 2, pt: 2, flexGrow: 1 }}>
                {SideBarOptions.map((option) => {
                    const active = option.link === location.pathname;
                    return (
                        <ListItem
                            key={option.titulo}
                            disablePadding
                            sx={{ mb: 0.4 }}
                        >
                            <ListItemButton
                                selected={active}
                                onClick={() => {
                                    navigate(option.link);
                                    onCloseDrawer();
                                }}
                                sx={{
                                    borderRadius: "8px",
                                    "&.Mui-selected": {
                                        bgcolor: "primary.main",
                                        color: "white",
                                        "&:hover": { bgcolor: "primary.light" },
                                    },
                                    "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                                    py: 1,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 40,
                                        color: active
                                            ? "white"
                                            : "primary.main",
                                    }}
                                >
                                    <option.icone size={20} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={option.titulo}
                                    primaryTypographyProps={{ fontWeight: 500 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {user && (
                <>
                    <Box sx={{ p: 2 }}>
                        <Card sx={{ bgcolor: "primary.main", color: "white" }}>
                            <CardContent>
                                <Typography variant="subtitle2" gutterBottom>
                                    Meta Mensal
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mb: 1,
                                    }}
                                >
                                    <Typography variant="caption">
                                        Progresso
                                    </Typography>
                                    <Typography variant="caption">
                                        75%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={75}
                                    sx={{
                                        bgcolor: "rgba(255,255,255,0.2)",
                                        "& .MuiLinearProgress-bar": {
                                            bgcolor: "secondary.main",
                                        },
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Box>

                    <Divider />
                    <List sx={{ px: 2 }}>
                        <ListItem disablePadding>
                            <ListItemButton
                                sx={{
                                    borderRadius: "8px",
                                    color: "error.main",
                                    py: 1,
                                }}
                                onClick={() => {
                                    navigate("/logout");
                                    onCloseDrawer();
                                }}
                            >
                                <ListItemIcon
                                    sx={{ minWidth: 40, color: "error.main" }}
                                >
                                    <LogOut size={20} />
                                </ListItemIcon>
                                <ListItemText primary="Sair" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
            )}
        </Box>
    );
}
