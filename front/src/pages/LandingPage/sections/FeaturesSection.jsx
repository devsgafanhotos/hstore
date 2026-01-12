import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { features } from "../data/features";
import { motion } from "framer-motion";

export default function Features() {
    return (
        <Box sx={{ py: 8, bgcolor: "white" }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <Card
                                    sx={{
                                        p: 3,
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                        boxShadow: "none",
                                        border: "1px solid #f0f0f0",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            p: 2,
                                            bgcolor: "rgba(243,112,33,0.1)",
                                            borderRadius: "50%",
                                            mb: 2,
                                        }}
                                    >
                                        <feature.icon
                                            size={32}
                                            color="#F37021"
                                        />
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        fontWeight="bold"
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {feature.desc}
                                    </Typography>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
