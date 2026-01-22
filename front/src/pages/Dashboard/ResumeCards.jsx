import { Box } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import {
    Users,
    DollarSign,
    BoxIcon,
} from "lucide-react";
import ResumeCard from "../../components/shower/ResumeCard";

export default function ResumeCards() {
    const resumes = [
        {
            title: "Vendas Hoje",
            value: "00",
            trend: "up",
            trendValue: "+12%",
            icon: DollarSign,
            color: "#F37021",
        },
        {
            title: "Vendas",
            value: "00",
            trend: "up",
            trendValue: "+4",
            icon: BoxIcon,
            color: "#3B82F6",
        },
        {
            title: "Sub-agentes",
            value: "00",
            trend: "up",
            trendValue: "+2",
            icon: Users,
            color: "#10B981",
        },
    ];

    return (
        <Box sx={{ mb: 3.5, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {resumes.map((resume) => (
                <>
                    <ResumeCard
                        color={resume.color}
                        icon={resume.icon}
                        title={resume.title}
                        value={resume.value}
                    />
                </>
            ))}
        </Box>
    );
}
