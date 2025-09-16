import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#1976d2" },
          secondary: { main: "#f50057" },
          background: { default: "#f4f6f8", paper: "#fff" },
        }
      : {
          primary: { main: "#90caf9" },
          secondary: { main: "#f48fb1" },
          background: { default: "#121212", paper: "#1d1d1d" },
        }),
  },
  spacing: 8,
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontSize: "2.5rem", fontWeight: 700 },
    h2: { fontSize: "2rem", fontWeight: 700 },
    body1: { fontSize: "1rem" },
  },
});
