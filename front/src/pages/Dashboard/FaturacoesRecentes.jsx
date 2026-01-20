import { Box, Button } from "@mui/material";
import SmartList from "../../components/shower/SmartList";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCache } from "../../hooks/useCache";

export default function FaturacoesRecentes() {
    const navigate = useNavigate();
    const { faturacoes } = useCache().entidades;

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
        <SmartList
            title={"Faturaçõees Recentes"}
            extraButton={extraButton}
            ListItems={faturacoes.slice(0, 9)}
        />
    );
}
