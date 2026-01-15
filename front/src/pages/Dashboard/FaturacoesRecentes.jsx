import { Box, Button } from "@mui/material";
import MyListItems from "../../components/shower/MyListItems";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FaturacoesRecentes({}) {
    const navigate = useNavigate();

    const faturacoesRecentes = [
        {
            id: 10,
            valor: 11000,
            dataFaturacao: "2025-09-16T08:43:00.000Z",
            tipoFaturacao: "Físico",
            formaPagamento: "Quinzenal",
            agente_id: 666489,
            usuario_id: 1,
            agente: "Lando Celestino",
        },
        {
            id: 9,
            valor: 5000,
            dataFaturacao: "2025-09-16T08:37:00.000Z",
            tipoFaturacao: "Físico",
            formaPagamento: "Quinzenal",
            agente_id: 659909,
            usuario_id: 1,
            agente: "Panzo Matondo",
        },
        {
            id: 7,
            valor: 5000,
            dataFaturacao: "2025-09-16T08:25:00.000Z",
            tipoFaturacao: "Electrônico",
            formaPagamento: "Quinzenal",
            agente_id: 656290,
            usuario_id: 1,
            agente: "Gilson Manuel",
        },
        {
            id: 8,
            valor: 5000,
            dataFaturacao: "2025-09-16T08:25:00.000Z",
            tipoFaturacao: "Físico",
            formaPagamento: "Quinzenal",
            agente_id: 656290,
            usuario_id: 1,
            agente: "Gilson Manuel",
        },
        {
            id: 6,
            valor: 4000,
            dataFaturacao: "2025-09-16T08:18:00.000Z",
            tipoFaturacao: "Físico",
            formaPagamento: "Quinzenal",
            agente_id: 654204,
            usuario_id: 1,
            agente: "Domingos Daniel",
        },
        {
            id: 4,
            valor: 10000,
            dataFaturacao: "2025-09-16T08:09:00.000Z",
            tipoFaturacao: "Electrônico",
            formaPagamento: "Quinzenal",
            agente_id: 680095,
            usuario_id: 1,
            agente: "Jorge Andre",
        },
        {
            id: 5,
            valor: 9000,
            dataFaturacao: "2025-09-16T08:09:00.000Z",
            tipoFaturacao: "Físico",
            formaPagamento: "Quinzenal",
            agente_id: 680095,
            usuario_id: 1,
            agente: "Jorge Andre",
        },
        {
            id: 3,
            valor: 7000,
            dataFaturacao: "2025-09-16T08:01:00.000Z",
            tipoFaturacao: "Físico",
            formaPagamento: "Quinzenal",
            agente_id: 622640,
            usuario_id: 1,
            agente: "Pedro Garcia",
        },
    ];

    const extraButton = (
        <Button
            size="small"
            color=""
            sx={{ mr: -1.5 }}
            endIcon={<MoreVertical size={16} />}
            onClick={() => navigate("/faturacoes")}
        >
            Mais
        </Button>
    );

    return (
        <MyListItems
            title={"Faturaçõees Recentes"}
            extraButton={extraButton}
            ListItems={faturacoesRecentes}
        />
    );
}
