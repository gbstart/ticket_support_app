import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import MultiTabs from "./MultiTab";

const TitleSection = () => {
  const { toggleColorMode, mode } = useThemeContext();
  const { t } = useTranslation();
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button color="inherit" onClick={toggleColorMode}>
          {mode === "light" ? "Dark" : "Light"}
        </Button>

        <Button color="inherit" onClick={() => i18n.changeLanguage("en")}>
          EN
        </Button>
        <Button color="inherit" onClick={() => i18n.changeLanguage("es")}>
          ES
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom style={{color: '#1976d2', fontWeight: 'bold', textAlign: 'center', marginTop: '10px'}}>
        🎫 {t("supportTicketSystem")}
      </Typography>
      <MultiTabs tabs={[{ label: t("tickets"), path: "/" }]} />
    </>
  );
};

export default TitleSection;
