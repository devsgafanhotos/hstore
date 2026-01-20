import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
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
        h6: { fontWeight: 700, fontSize: "1rem" },
        caption: {
            fontSize: "0.75rem",
            color: "#94A3B8",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
        },
        subtitle1: { fontWeight: 600, fontSize: "0.9rem" },
        body2: { fontSize: "0.85rem" },
    },
    palette: {
        mode: "light",
        primary: { main: "#0F172A" },
        secondary: { main: "#F37021" },
        background: {
            default: "#F1F5F9",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#1E293B",
            secondary: "#64748B",
        },
        green: { primary: "#5acc02" },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "9px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                    border: "1px solid #E2E8F0",
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    borderRadius: "9px",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderBottom: "1px solid #f0f0f0",
                    fontWeight: 600,
                    padding: 14,
                    paddingBottom: 8,
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    borderRadius: "9px",
                    padding: "16px",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "secondary.main",
                    borderRadius: 8,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "background.paper",
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    padding: 0,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    padding: 2,
                    paddingLeft: "8px",
                    paddingRight: "8px",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 8,
                        backgroundColor: "#FFFFFF",
                        "& fieldset": { borderColor: "#E2E8F0" },
                        "&:hover fieldset": { borderColor: "#CBD5E1" },
                    },
                },
            },
        },
    },
});

export default theme;
