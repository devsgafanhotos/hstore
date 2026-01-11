// iconMapper.js
import {
    FaIdCard,
    FaPhone,
    FaCalendarAlt,
    FaUserCheck,
    FaUser,
    FaUsers,
    FaUserTie,
    FaUserCircle,
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
import { LuFishOff, LuFishSymbol, LuLogIn, LuLogOut, LuMail,  } from "react-icons/lu";


const iconMapper = {
    "id": FaIdCard,
    "home": FaHome,
    "telefone": FaPhone,
    "dataCadastro": FaCalendarAlt,
    "cadastradoPor": FaUserCheck,
    "nome": FaUser,
    "email": LuMail,
    "role": FaUserShield,
    "senha": FaUser,
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
    "perfil": FaUserCircle,
    "sair": LuLogIn,
    "entrar": LuLogOut,
    "totalVendido": FaChartLine,
    "meuPerfil": FaRegUserCircle,
};

// Função para retornar dinamicamente
export const getIcon = (key) => {
    return iconMapper[key] || FaQuestionCircle;
};

export default iconMapper;
