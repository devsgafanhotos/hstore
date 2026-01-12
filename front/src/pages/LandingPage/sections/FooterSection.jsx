import {
    Box,
    Container,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

export default function Footer() {
    return (
        <Box
            sx={{ bgcolor: "#1E293B", color: "white", pt: 8, pb: 4 }}
            id="contactos"
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 800, mb: 2 }}
                        >
                            H-STORE
                        </Typography>
                        <Typography
                            variant="body2"
                            color="grey.500"
                            sx={{ mb: 2 }}
                        >
                            A sua loja de confiança para tecnologia e serviços
                            Unitel. Qualidade e inovação para o seu dia a dia.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <IconButton
                                size="small"
                                sx={{
                                    color: "white",
                                    bgcolor: "rgba(255,255,255,0.1)",
                                }}
                            >
                                <Facebook size={20} />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{
                                    color: "white",
                                    bgcolor: "rgba(255,255,255,0.1)",
                                }}
                            >
                                <Instagram size={20} />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{
                                    color: "white",
                                    bgcolor: "rgba(255,255,255,0.1)",
                                }}
                            >
                                <Linkedin size={20} />
                            </IconButton>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ mb: 3 }}>
                            Links Rápidos
                        </Typography>
                        <Stack spacing={1}>
                            {[
                                "Smartphones",
                                "Computadores",
                                "Acessórios",
                                "Serviços Unitel",
                            ].map((link) => (
                                <Typography
                                    key={link}
                                    variant="body2"
                                    color="grey.500"
                                    sx={{
                                        cursor: "pointer",
                                        "&:hover": { color: "#F37021" },
                                    }}
                                >
                                    {link}
                                </Typography>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ mb: 3 }}>
                            Contactos
                        </Typography>
                        <Stack spacing={2}>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    alignItems: "center",
                                }}
                            >
                                <MapPin size={20} color="#F37021" />
                                <Typography variant="body2" color="grey.400">
                                    Rua Principal, Luanda, Angola
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    alignItems: "center",
                                }}
                            >
                                <Phone size={20} color="#F37021" />
                                <Typography variant="body2" color="grey.400">
                                    +244 923 000 000
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    alignItems: "center",
                                }}
                            >
                                <Mail size={20} color="#F37021" />
                                <Typography variant="body2" color="grey.400">
                                    geral@h-store.ao
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        borderTop: "1px solid rgba(255,255,255,0.1)",
                        mt: 8,
                        pt: 3,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="body2" color="grey.600">
                        © {new Date().getFullYear()} H-Store. Todos os direitos
                        reservados.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
