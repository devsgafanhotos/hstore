import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    palette: {
        primary: { main: "#4B1E78" },
        secondary: { main: "#f7941e" },
        background: { default: "#FFFFFF" },
    },
});

export default theme;
