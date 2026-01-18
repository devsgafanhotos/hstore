import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Profile from "../../components/shower/Profile.jsx";

export default function Usuario() {
    const { state } = useLocation();
    const usuario = state?.user;

    return (
        <Box flex={"1"}>
            <Profile ItemProfile={usuario} />
        </Box>
    );
}
