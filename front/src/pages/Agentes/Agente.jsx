import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Profile from "../../components/shower/Profile.jsx";

export default function Agente() {
    const { state } = useLocation();
    const agente = state?.agent;

    return (
        <Box flex={"1"}>
            <Profile ItemProfile={agente} />
        </Box>
    );
}
