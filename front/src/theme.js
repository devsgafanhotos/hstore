import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: "none",
            fontWeight: 500,
        },
        h1: {
            fontWeight: 800,
            fontSize: "3.5rem",
            "@media (max-width:600px)": {
                fontSize: "2.5rem",
            },
        },
        h2: {
            fontWeight: 700,
            fontSize: "2.5rem",
            marginBottom: "1rem",
        },
        h3: {
            fontWeight: 600,
            fontSize: "1.5rem",
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
        },
    },
    palette: {
        mode: "light",
        primary: { main: "#4B1E78" },
        secondary: { main: "#f7941e" },//
        text: {
            primary: "#1E293B",
            secondary: "#64748B",
        },
        background: { default: "#FFFFFF" },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 50,
                    padding: "10px 24px",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                },
            },
        },
    },
});

export default theme;
