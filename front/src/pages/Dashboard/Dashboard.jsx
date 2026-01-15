import {
    Box,
    Typography,
    Button,
} from "@mui/material";
import { Plus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCache } from "../../hooks/useCache";

import ResumeCards from "./ResumeCards";
import FaturacoesRecentes from "./FaturacoesRecentes";
import AgentesDestacados from "./AgentesDestacados";

export default function Dashboard() {
    const { user } = useAuth();
    const { handleSell } = useCache();
    return (
        <Box
            sx={{
                flex: "1",
                p: { xs: 0.4, md: 3 },
                display: "flex",
                flexFlow: "column",
                bgcolor: "background.default",
            }}
        >
            <Box
                sx={{
                    mb: 2,

                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                <Box>
                    <Typography variant="h4" color="primary" gutterBottom>
                        Olá, {user.nome.split(" ")[0]} 👋
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Aqui está o resumo do desempenho da H-Store hoje.
                    </Typography>
                </Box>
                <div className="animate-bounce hover:animate-none mb-2">
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "secondary.main" }}
                        startIcon={<Plus size={18} />}
                        onClick={handleSell}
                    >
                        Nova Venda
                    </Button>
                </div>
                <ResumeCards />
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { sx: "1fr", md: "1fr 1fr" },
                    gap: 1,
                }}
            >
                {/* Recent Sales */}
                <Box>
                    <FaturacoesRecentes />
                </Box>

                {/* Sidebar Widgets (Stock Alerts) */}
                <Box>
                    <AgentesDestacados />
                </Box>
            </Box>
        </Box>
    );
}
