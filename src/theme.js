import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#EE6123", // Bitly orange
        },
        secondary: {
            main: "#1A73E8", // Bitly blue
        },
        text: {
            primary: "#222",
            secondary: "#555",
        },
        background: {
            default: "#f9f9f9",
            paper: "#fff",
        },
        error: {
            main: "#d32f2f",
        },
    },
    typography: {
        fontFamily: "Inter, Roboto, sans-serif",
        h1: { fontSize: "48px", fontWeight: 700 },
        h2: { fontSize: "32px", fontWeight: 600 },
        h3: { fontSize: "24px", fontWeight: 600 },
        body1: { fontSize: "16px" },
        body2: { fontSize: "14px", color: "#555" },
    },
    shape: {
        borderRadius: 8, // Rounded inputs/buttons
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 500,
                    boxShadow: "none",
                    "&:hover": { boxShadow: "none" },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                },
            },
        },
    },
});

export default theme;
