import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export function BottomModal({
    open,
    onClose,
    title = "Título",
    children,
    minHeight = "1vh",
}) {
    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    minHeight,
                    maxHeight: "95vh",
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                {/* Handle bar estilo apps mobile */}
                <Box
                    sx={{
                        width: 50,
                        height: 5,
                        bgcolor: "grey.400",
                        borderRadius: 2,
                        mx: "auto",
                        mb: 1,
                    }}
                />

                <Typography variant="h6" sx={{ textAlign: "center", mb: 1 }}>
                    {title}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* Conteúdo livre */}
                <Box sx={{ overflowY: "auto", maxHeight: "100%" }}>
                    {children}
                </Box>
            </Box>
        </Drawer>
    );
}

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Page() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Abrir Modal Mobile
            </Button>

            <BottomModal
                open={open}
                onClose={() => setOpen(false)}
                title="Formulário"
            >
                <TextField fullWidth label="Nome" sx={{ mb: 2 }} />
                <TextField fullWidth label="Telefone" sx={{ mb: 2 }} />
                <Button fullWidth variant="contained">
                    Salvar
                </Button>
            </BottomModal>
        </>
    );
}
