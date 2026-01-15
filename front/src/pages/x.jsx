import React, { useState } from "react";
import {
    Box,
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Badge,
    Container,
    Grid,
    Paper,
    Link,
    Avatar,
    ThemeProvider,
    createTheme,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Card,
    CardContent,
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
    LinearProgress,
} from "@mui/material";
import {
    Menu as MenuIcon,
    LayoutDashboard,
    ShoppingCart,
    Users,
    Package,
    Settings,
    Bell,
    Search,
    LogOut,
    TrendingUp,
    TrendingDown,
    DollarSign,
    CreditCard,
    Smartphone,
    Wifi,
    MoreVertical,
    Plus,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Theme Configuration (Consistent with Landing Page) ---
const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#0F172A",
        },
        secondary: {
            main: "#F37021",
        },
        background: {
            default: "#F1F5F9", // Slightly darker than white for dashboard bg
            paper: "#FFFFFF",
        },
        text: {
            primary: "#1E293B",
            secondary: "#64748B",
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: { fontWeight: 700 },
        h6: { fontWeight: 600 },
        subtitle1: { fontWeight: 500 },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                    border: "1px solid #E2E8F0",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                    fontWeight: 600,
                },
            },
        },
    },
});

// --- Mock Data ---
const recentSales = [
    {
        id: "#ORD-7352",
        product: "iPhone 15 Pro",
        customer: "João Silva",
        date: "Hoje, 10:42",
        amount: "1.450.000 Kz",
        status: "Concluído",
        type: "Venda",
    },
    {
        id: "#ORD-7351",
        product: "Recarga Unitel 5000",
        customer: "Maria Sousa",
        date: "Hoje, 09:15",
        amount: "5.000 Kz",
        status: "Concluído",
        type: "Serviço",
    },
    {
        id: "#ORD-7350",
        product: "MacBook Air M2",
        customer: "Tech Angola Lda",
        date: "Ontem",
        amount: "1.200.000 Kz",
        status: "Pendente",
        type: "Venda",
    },
    {
        id: "#ORD-7349",
        product: "Plano Net Casa",
        customer: "Pedro Miguel",
        date: "Ontem",
        amount: "25.000 Kz",
        status: "Processando",
        type: "Serviço",
    },
    {
        id: "#ORD-7348",
        product: "Samsung S24 Ultra",
        customer: "Ana Costa",
        date: "22 Out",
        amount: "1.350.000 Kz",
        status: "Cancelado",
        type: "Venda",
    },
];

const lowStockItems = [
    { name: "AirPods Pro 2", stock: 2, max: 20 },
    { name: "iPhone 13 128GB", stock: 1, max: 15 },
    { name: "Carregador 20W", stock: 4, max: 50 },
];

// --- Components ---

const StatCard = ({ title, value, trend, trendValue, icon: Icon, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                    }}
                >
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: "12px",
                            bgcolor: `${color}15`,
                            color: color,
                        }}
                    >
                        <Icon size={24} />
                    </Box>
                    {trend && (
                        <Chip
                            icon={
                                trend === "up" ? (
                                    <TrendingUp size={14} />
                                ) : (
                                    <TrendingDown size={14} />
                                )
                            }
                            label={trendValue}
                            size="small"
                            color={trend === "up" ? "success" : "error"}
                            variant="soft"
                            sx={{
                                bgcolor: trend === "up" ? "#DCFCE7" : "#FEE2E2",
                                color: trend === "up" ? "#166534" : "#991B1B",
                                fontWeight: 600,
                            }}
                        />
                    )}
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h4" color="text.primary">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    </motion.div>
);

const SalesTable = () => (
    <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>ID Pedido</TableCell>
                    <TableCell>Produto/Serviço</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Estado</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {recentSales.map((row) => (
                    <TableRow
                        key={row.id}
                        hover
                        sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                        }}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: 600, color: "primary.main" }}
                        >
                            {row.id}
                        </TableCell>
                        <TableCell>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                {row.type === "Venda" ? (
                                    <Smartphone size={16} color="#64748B" />
                                ) : (
                                    <Wifi size={16} color="#F37021" />
                                )}
                                {row.product}
                            </Box>
                        </TableCell>
                        <TableCell>{row.customer}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                            {row.amount}
                        </TableCell>
                        <TableCell>
                            <Chip
                                label={row.status}
                                size="small"
                                sx={{
                                    bgcolor:
                                        row.status === "Concluído"
                                            ? "#DCFCE7"
                                            : row.status === "Pendente"
                                            ? "#FEF9C3"
                                            : row.status === "Processando"
                                            ? "#DBEAFE"
                                            : "#FEE2E2",
                                    color:
                                        row.status === "Concluído"
                                            ? "#166534"
                                            : row.status === "Pendente"
                                            ? "#854D0E"
                                            : row.status === "Processando"
                                            ? "#1E40AF"
                                            : "#991B1B",
                                    fontWeight: 600,
                                }}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

// --- Main Layout ---

const drawerWidth = 260;

export default function Dashboard() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Toolbar
                sx={{ display: "flex", alignItems: "center", px: 3, py: 4 }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 900,
                        color: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    H-STORE
                    <Box
                        component="span"
                        sx={{
                            width: 8,
                            height: 8,
                            bgcolor: "secondary.main",
                            borderRadius: "50%",
                        }}
                    />
                </Typography>
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
                    ADMIN
                </Typography>
            </Toolbar>
            <Divider />
            <List sx={{ px: 2, pt: 2, flexGrow: 1 }}>
                {[
                    {
                        text: "Visão Geral",
                        icon: LayoutDashboard,
                        active: true,
                    },
                    { text: "Vendas", icon: DollarSign },
                    { text: "Encomendas", icon: Package },
                    { text: "Produtos", icon: Smartphone },
                    { text: "Serviços Unitel", icon: Wifi, color: "#F37021" },
                    { text: "Clientes", icon: Users },
                ].map((item, index) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            selected={item.active}
                            sx={{
                                borderRadius: "8px",
                                "&.Mui-selected": {
                                    bgcolor: "primary.main",
                                    color: "white",
                                    "&:hover": { bgcolor: "primary.light" },
                                },
                                "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 40,
                                    color: item.active
                                        ? "white"
                                        : item.color || "text.secondary",
                                }}
                            >
                                <item.icon size={20} />
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{ fontWeight: 500 }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

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
                            <Typography variant="caption">Progresso</Typography>
                            <Typography variant="caption">75%</Typography>
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
                        sx={{ borderRadius: "8px", color: "error.main" }}
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
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    bgcolor: "background.default",
                }}
            >
                <CssBaseline />

                {/* App Bar */}
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
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Visão Geral
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                            }}
                        >
                            <IconButton size="small">
                                <Search size={20} />
                            </IconButton>
                            <IconButton size="small">
                                <Badge badgeContent={3} color="secondary">
                                    <Bell size={20} />
                                </Badge>
                            </IconButton>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    ml: 1,
                                    p: 0.5,
                                    pr: 1.5,
                                    borderRadius: 50,
                                    border: "1px solid #e2e8f0",
                                    bgcolor: "white",
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        bgcolor: "secondary.main",
                                    }}
                                >
                                    A
                                </Avatar>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        display: { xs: "none", sm: "block" },
                                    }}
                                >
                                    Admin
                                </Typography>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Side Drawer */}
                <Box
                    component="nav"
                    sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                >
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { xs: "block", md: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: "none", md: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                                borderRight: "1px solid #e2e8f0",
                            },
                        }}
                        open
                    >
                        {drawerContent}
                    </Drawer>
                </Box>

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { md: `calc(100% - ${drawerWidth}px)` },
                        overflowX: "hidden",
                    }}
                >
                    <Toolbar /> {/* Spacer for AppBar */}
                    {/* Welcome Section */}
                    <Box
                        sx={{
                            mb: 4,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h4"
                                color="primary"
                                gutterBottom
                            >
                                Olá, Admin 👋
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Aqui está o resumo do desempenho da H-Store
                                hoje.
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="outlined"
                                startIcon={<Package size={18} />}
                            >
                                Gerir Stock
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<Plus size={18} />}
                            >
                                Nova Venda
                            </Button>
                        </Box>
                    </Box>
                    {/* Stats Grid */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Vendas Hoje"
                                value="245.000 Kz"
                                trend="up"
                                trendValue="+12%"
                                icon={DollarSign}
                                color="#F37021"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Encomendas"
                                value="18"
                                trend="up"
                                trendValue="+4"
                                icon={ShoppingCart}
                                color="#3B82F6"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Serviços Unitel"
                                value="45"
                                trend="down"
                                trendValue="-2%"
                                icon={Wifi}
                                color="#8B5CF6"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Novos Clientes"
                                value="6"
                                trend="up"
                                trendValue="+2"
                                icon={Users}
                                color="#10B981"
                            />
                        </Grid>
                    </Grid>
                    {/* Main Content Area */}
                    <Grid container spacing={3}>
                        {/* Recent Sales */}
                        <Grid item xs={12} lg={8}>
                            <Card sx={{ height: "100%" }}>
                                <Box
                                    sx={{
                                        p: 3,
                                        borderBottom: "1px solid #f0f0f0",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="h6">
                                        Últimas Transações
                                    </Typography>
                                    <Button
                                        size="small"
                                        endIcon={<MoreVertical size={16} />}
                                    >
                                        Ver Tudo
                                    </Button>
                                </Box>
                                <SalesTable />
                            </Card>
                        </Grid>

                        {/* Sidebar Widgets (Stock Alerts) */}
                        <Grid item xs={12} lg={4}>
                            <Card sx={{ mb: 3 }}>
                                <Box
                                    sx={{
                                        p: 3,
                                        borderBottom: "1px solid #f0f0f0",
                                    }}
                                >
                                    <Typography variant="h6">
                                        Alertas de Stock
                                    </Typography>
                                </Box>
                                <CardContent>
                                    <List disablePadding>
                                        {lowStockItems.map((item, i) => (
                                            <React.Fragment key={i}>
                                                <ListItem sx={{ px: 0, py: 2 }}>
                                                    <Box sx={{ width: "100%" }}>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-between",
                                                                mb: 1,
                                                            }}
                                                        >
                                                            <Typography variant="subtitle2">
                                                                {item.name}
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                color="error.main"
                                                                fontWeight={700}
                                                            >
                                                                {item.stock}{" "}
                                                                restantes
                                                            </Typography>
                                                        </Box>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={
                                                                (item.stock /
                                                                    item.max) *
                                                                100
                                                            }
                                                            color="error"
                                                            sx={{
                                                                height: 6,
                                                                borderRadius: 3,
                                                                bgcolor:
                                                                    "#FEE2E2",
                                                            }}
                                                        />
                                                    </Box>
                                                </ListItem>
                                                {i <
                                                    lowStockItems.length -
                                                        1 && <Divider />}
                                            </React.Fragment>
                                        ))}
                                    </List>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mt: 2 }}
                                        color="primary"
                                    >
                                        Reabastecer
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card
                                sx={{
                                    bgcolor: "secondary.main",
                                    color: "white",
                                }}
                            >
                                <CardContent
                                    sx={{ textAlign: "center", py: 4 }}
                                >
                                    <Box
                                        sx={{
                                            bgcolor: "rgba(255,255,255,0.2)",
                                            width: 60,
                                            height: 60,
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mx: "auto",
                                            mb: 2,
                                        }}
                                    >
                                        <Wifi size={32} />
                                    </Box>
                                    <Typography variant="h6" gutterBottom>
                                        Portal Unitel
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ opacity: 0.9, mb: 3 }}
                                    >
                                        Acesso rápido para carregamentos e
                                        ativação de planos empresariais.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            bgcolor: "white",
                                            color: "secondary.main",
                                            "&:hover": {
                                                bgcolor:
                                                    "rgba(255,255,255,0.9)",
                                            },
                                        }}
                                    >
                                        Aceder ao Portal
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
