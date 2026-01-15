import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {
    Users,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Wifi,
    BoxIcon,
} from "lucide-react";

export default function ResumeCards({}) {
    const resumes = [
        {
            title: "Vendas Hoje",
            value: "245.000 Kz",
            trend: "up",
            trendValue: "+12%",
            icon: DollarSign,
            color: "#F37021",
        },
        {
            title: "Vendas",
            value: "18",
            trend: "up",
            trendValue: "+4",
            icon: BoxIcon,
            color: "#3B82F6",
        },
        {
            title: "Novos Sub-agentes",
            value: "6",
            trend: "up",
            trendValue: "+2",
            icon: Users,
            color: "#10B981",
        },
    ];

    const CardResume = ({
        title,
        value,
        trend,
        trendValue,
        icon: Icon,
        color,
    }) => (
        <Box  sm={6} md={3}>
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
                                gap: 4,
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
                                        bgcolor:
                                            trend === "up"
                                                ? "#DCFCE7"
                                                : "#FEE2E2",
                                        color:
                                            trend === "up"
                                                ? "#166534"
                                                : "#991B1B",
                                        fontWeight: 600,
                                    }}
                                />
                            )}
                        </Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            {title}
                        </Typography>
                        <Typography variant="h4" color="text.primary">
                            {value}
                        </Typography>
                    </CardContent>
                </Card>
            </motion.div>
        </Box>
    );

    return (
        <Box sx={{ mb: 3.5, display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {resumes.map((resume) => (
                <CardResume
                    title={resume.title}
                    value={resume.value}
                    trendValue={resume.trendValue}
                    trend={resume.trend}
                    icon={resume.icon}
                    color={resume.color}
                />
            ))}
        </Box>
    );
}
