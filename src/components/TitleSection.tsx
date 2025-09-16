import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

const TitleSection = () => {
  const { toggleColorMode, mode } = useThemeContext();
  const { t } = useTranslation();
  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
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
      <Typography variant="h4" gutterBottom>
        🎫 {t("supportTicketSystem")}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button component={Link} to="/" variant="outlined" sx={{ mr: 1 }}>
          {t("tickets")}
        </Button>
        <Button component={Link} to="/create" variant="outlined">
            {t("createTickets")}
        </Button>
      </Box>
    </>
  );
};

export default TitleSection;
