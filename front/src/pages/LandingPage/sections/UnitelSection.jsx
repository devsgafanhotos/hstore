import { Box, Container, Grid, Typography } from "@mui/material";
import { CheckCircle, Smartphone, Wifi } from "lucide-react";
import { motion } from "framer-motion";

export default function UnitelSection () {
    return (
        <Box
            sx={{
                py: 10,
                bgcolor: "#0F172A",
                color: "white",
                position: "relative",
                overflow: "hidden",
            }}
            id="unitel"
        >
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <Typography
                                variant="overline"
                                sx={{
                                    color: "#F37021",
                                    fontWeight: 700,
                                    letterSpacing: 2,
                                }}
                            >
                                PARCEIRO OFICIAL
                            </Typography>
                            <Typography variant="h2" sx={{ mt: 1, mb: 3 }}>
                                Agente Autorizado Unitel
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "grey.400",
                                    mb: 4,
                                    fontSize: "1.1rem",
                                }}
                            >
                                Na H-Store, não vendemos apenas equipamentos.
                                Simplificamos a sua conexão. Trate de todos os
                                seus serviços Unitel com rapidez e segurança na
                                nossa loja.
                            </Typography>

                            <Grid container spacing={2}>
                                {[
                                    "Recargas e Saldos",
                                    "Planos de Dados",
                                    "Unitel Money",
                                    "Registo de Chips",
                                ].map((item, idx) => (
                                    <Grid item xs={6} key={idx}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <CheckCircle
                                                size={20}
                                                color="#F37021"
                                            />
                                            <Typography variant="body2">
                                                {item}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* Abstract Representation of Connectivity */}
                        <Box
                            sx={{
                                height: 400,
                                bgcolor: "rgba(255,255,255,0.05)",
                                borderRadius: 4,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid rgba(255,255,255,0.1)",
                            }}
                        >
                            <Smartphone
                                size={120}
                                color="white"
                                opacity={0.8}
                            />
                            <Box sx={{ position: "absolute" }}>
                                <Wifi
                                    size={200}
                                    color="#F37021"
                                    opacity={0.3}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
