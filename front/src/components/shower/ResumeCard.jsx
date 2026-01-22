import { Box, Card, CardContent, Typography, Grid, Stack } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
// --- Componente Auxiliar: StatCard (Cartão de Estatística) ---
export default function ResumeCard({
    title,
    value,
    // eslint-disable-next-line no-unused-vars
    icon: Icon,
    color,
}) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Card
                sx={{
                    height: "100%",
                    width: "100%",
                    mb: 1.5,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Elemento decorativo de fundo (círculo suave) */}
                <Box
                    sx={{
                        position: "absolute",
                        top: -20,
                        right: -25,
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        backgroundColor: color,
                        opacity: 0.1,
                        zIndex: 0,
                    }}
                />

                <CardContent
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        p: 3,
                        px: { sx: 2, md: 3 },
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        {/* Informações de Texto */}
                        <Box>
                            <Typography
                                variant="subtitle2"
                                fontSize={"1.2rem"}
                                pr={.5}
                                color="text.secondary"
                                gutterBottom
                            >
                                {title}
                            </Typography>
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{ mb: 1 }}
                            >
                                {value}
                            </Typography>
                        </Box>

                        {/* Ícone Principal */}
                        <Box
                            sx={{
                                backgroundColor: `${color}15`, // 15 é hex para baixa opacidade
                                color: color,
                                borderRadius: "12px",
                                p: 1.5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Icon size={28} strokeWidth={2} />
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </motion.div>
    );
}
