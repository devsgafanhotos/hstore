import { CalendarMonth, Mail, Password, People, Phone } from "@mui/icons-material";
import {
    FaIdCard,
    FaUserCheck,
    FaUsers,
    FaUserTie,
    FaChartPie,
    FaChartLine,
    FaCalendarCheck,
    FaCalendarWeek,
    FaCalendarDay,
    FaCheckCircle,
    FaClock,
    FaFileInvoiceDollar,
    FaRegUserCircle,
    FaCreditCard,
    FaQuestionCircle,
    FaUserShield,
    FaHome,
} from "react-icons/fa";
import { LuFishOff, LuFishSymbol } from "react-icons/lu";


const iconMapper = {
    "id": FaIdCard,
    "telefone": Phone,
    "data": CalendarMonth,
    "dataCadastro": CalendarMonth,
    "cadastradoPor": FaUserCheck,
    "nome": People,
    "email": Mail,
    "role": FaUserShield,
    "senha": Password,


    "home": FaHome,
    "relatorios": FaChartPie,
    "pagamentos": FaCreditCard,
    "pagamentosEfetuados": FaCheckCircle,
    "pagamentosPendentes": FaClock,
    "dadosMensal": FaCalendarCheck,
    "dadosQuinzenal": FaCalendarWeek,
    "dadosDiaria": FaCalendarDay,
    "faturacoes": FaFileInvoiceDollar,
    "Electrônico": LuFishSymbol,
    "Físico": LuFishOff,
    "subAgentes": FaUsers,
    "usuariosCadastrados": FaUserTie,
    "totalVendido": FaChartLine,
    "meuPerfil": FaRegUserCircle,
};

// Função para retornar dinamicamente
export const getIcon = (key) => {
    return iconMapper[key] || FaQuestionCircle;
};

export default iconMapper;
