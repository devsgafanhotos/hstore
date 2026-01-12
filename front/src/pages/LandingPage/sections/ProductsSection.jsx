import { Box, Card, CardActions, CardContent, Container, Grid, Typography, Button, Chip, CardMedia } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { products } from "../data/products";
import { motion } from "framer-motion";

export default function ProductShowcase (){
    return (
        <Box sx={{ py: 10, bgcolor: "#F8FAFC" }} id="smartphones">
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "end",
                        mb: 6,
                    }}
                >
                    <Box>
                        <Typography
                            variant="overline"
                            color="secondary"
                            fontWeight={700}
                            letterSpacing={2}
                        >
                            LOJA ONLINE
                        </Typography>
                        <Typography variant="h2" color="primary">
                            Mais Vendidos
                        </Typography>
                    </Box>
                    <Button endIcon={<ArrowRight />} color="primary">
                        Ver tudo
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {products.map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        position: "relative",
                                    }}
                                >
                                    {product.badge && (
                                        <Chip
                                            label={product.badge}
                                            color="secondary"
                                            size="small"
                                            sx={{
                                                position: "absolute",
                                                top: 12,
                                                right: 12,
                                                zIndex: 1,
                                                fontWeight: 700,
                                            }}
                                        />
                                    )}
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image={product.image}
                                        alt={product.title}
                                        sx={{
                                            p: 2,
                                            objectFit: "contain",
                                            bgcolor: "#fff",
                                        }}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ textTransform: "uppercase" }}
                                        >
                                            {product.category}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="div"
                                            fontWeight={600}
                                        >
                                            {product.title}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            color="secondary"
                                            fontWeight={700}
                                        >
                                            {product.price}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ p: 2, pt: 0 }}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            color="primary"
                                        >
                                            Adicionar
                                        </Button>
                                    </CardActions>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};
