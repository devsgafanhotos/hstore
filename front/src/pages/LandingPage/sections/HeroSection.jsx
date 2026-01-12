import {
    Box,
    Button,
    Chip,
    Container,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <Box
            id="inicio"
            sx={{
                minHeight: "85vh",
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(135deg, #F8FAFC, #E2E8F0)",
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Chip
                                label="Agente Autorizado Unitel"
                                color="secondary"
                                sx={{ mb: 3 }}
                            />

                            <Typography variant="h1" color="primary">
                                Tecnologia que <br />
                                <span style={{ color: "#F37021" }}>
                                    conecta pessoas
                                </span>
                            </Typography>

                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{ mt: 2, mb: 4, maxWidth: 500 }}
                            >
                                Smartphones, computadores e serviços Unitel num
                                só lugar.
                            </Typography>

                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowRight />}
                                >
                                    Ver Catálogo
                                </Button>
                                <Button variant="outlined">
                                    Serviços Unitel
                                </Button>
                            </Stack>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd"
                            sx={{
                                width: "100%",
                                borderRadius: 4,
                                boxShadow: 6,
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
