import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    LinearProgress,
    List,
    ListItem,
    ListItemButton,
    Typography,
} from "@mui/material";
import React from "react";
import { getMoeda } from "../../components/shower/SmartList";
const maxVenda = 100000;
export default function AgentesDestacados() {
    const agentesEmDestaque = [
        { nome: "Agente", total: 45000 },
        { nome: "Agente", total: 25000 },
        { nome: "Agente", total: 15000 },
    ];

    return (
        <Card sx={{ mb: 3 }}>
            <CardHeader
                title="Ranking mensal"
                sx={{ borderBottom: "1px solid #f0f0f0", paddingTop: "17px" }}
            />
            <CardContent>
                <List disablePadding  >
                    {agentesEmDestaque.map((agente, i) => (
                        <React.Fragment key={i}>
                            <ListItem sx={{ padding: 0 }}>
                                <ListItemButton sx={{ px: 2, py: 2.5, borderRadius: 2 }}>
                                    <Box sx={{ width: "100%" }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                mb: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                fontWeight={700}
                                            >
                                                {agente.nome}
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                color="secondary.main"
                                                fontWeight={700}
                                            >
                                                {getMoeda(agente.total)}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={
                                                (agente.total / maxVenda) * 100
                                            }
                                            color="secondary"
                                            sx={{
                                                height: 6,
                                                borderRadius: 3, //
                                                bgcolor: "#f3722138",
                                            }}
                                        />
                                    </Box>
                                </ListItemButton>
                            </ListItem>
                            {i < agentesEmDestaque.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
