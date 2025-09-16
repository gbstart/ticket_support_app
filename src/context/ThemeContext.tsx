import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { getDesignTokens } from "../theme";
import { ThemeContextType } from "../types";
import { ThemeMode } from "../enum";



const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeContext must be used within ThemeProvider");
  return context;
};

export const CustomThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(ThemeMode.Light);

  const toggleColorMode = () => setMode((prev) => (prev === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light));

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
