import { CreditCard, Dashboard, Payments } from "@mui/icons-material";
import {
    ComputerIcon,
    Contact,
    DollarSign,
    Home,
    LayoutDashboard,
    LogIn,
    LogOut,
    SmartphoneIcon,
    User,
    Users,
    WifiHigh,
} from "lucide-react";
import { FaUserTie } from "react-icons/fa";

export const MenuOptions = {
    Admin: [
        {
            titulo: "Visão Geral",
            link: "/",
            icone: LayoutDashboard,
        },
        {
            titulo: "Relatórios",
            link: "/relatorios",
            icone: Dashboard,
        },
        {
            titulo: "Pagamentos",
            link: "/pagamentos",
            icone: CreditCard,
        },
        {
            titulo: "Faturações",
            link: "/faturacoes",
            icone: DollarSign,
        },
        {
            titulo: "Sub-agentes",
            link: "/Subagentes",
            icone: Users,
        },
        {
            titulo: "Usuários",
            link: "/usuarios",
            icone: FaUserTie,
        },
    ],
    Normal: [
        {
            titulo: "Visão Geral",
            link: "/",
            icone: LayoutDashboard,
        },
        {
            titulo: "Relatórios",
            link: "/relatorios",
            icone: Dashboard,
        },
        {
            titulo: "Pagamentos",
            link: "/pagamentos",
            icone: Payments,
        },
        {
            titulo: "Faturações",
            link: "/faturacoes",
            icone: DollarSign,
        },
        {
            titulo: "Sub-agentes",
            link: "/Subagentes",
            icone: Users,
        },
        {
            titulo: "Usuários",
            link: "/usuarios",
            icone: FaUserTie,
        },
    ],
    NavBar: [
        {
            titulo: "Smartphones",
            link: "/Smartphones",
            icone: SmartphoneIcon,
        },
        {
            titulo: "Computadores",
            link: "/Computadores",
            icone: ComputerIcon,
        },
        {
            titulo: "Unitel",
            link: "/Unitel",
            icone: WifiHigh,
        },
        {
            titulo: "Contactos",
            link: "/Contactos",
            icone: Contact,
        },
    ],
    Public: [
        {
            titulo: "Inicio",
            link: "/home",
            icone: Home,
        },
        {
            titulo: "Entrar",
            link: "/login",
            icone: LogIn,
        },
    ],
};
