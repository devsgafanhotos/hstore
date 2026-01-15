import { useRef, useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../partials/template/Header";
import Sidebar from "../partials/template/Sidebar";
import ScrollTop from "../components/feedback/ScrollTop";
import { DialogNovaFaturacao } from "../pages/Faturacoes/Cadastrar";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

export default function AppLayout() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const boxRef = useRef(null); // Ref para o box principal
    const { user } = useAuth();

    return (
        <Box sx={{ display: "flex", height: "100vh", border: "1px solid" }}>
            <Header drawerState={{ openDrawer, setOpenDrawer }} />
            <Sidebar drawerState={{ openDrawer, setOpenDrawer }} />
            <motion.div
                style={{ display: "flex", flex: "1", flexFlow: "column" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Box
                    ref={boxRef}
                    component="main"
                    sx={{
                        display: "flex",
                        flexFlow: "column",
                        flexGrow: 1,
                        overflowY: "scroll",
                        p: 1,
                        mt: 7,
                    }}
                >
                    <Outlet />
                    {user && <DialogNovaFaturacao />}
                    <ScrollTop target={() => boxRef.current} />
                </Box>
            </motion.div>
        </Box>
    );
}
