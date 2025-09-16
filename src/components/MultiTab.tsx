import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

type MultiTabsProps = {
  tabs: { label: string; path: string }[];
};

const MultiTabs: React.FC<MultiTabsProps> = ({ tabs }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = tabs.findIndex((tab) => location.pathname === tab.path);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
      <Tabs
        value={currentTab === -1 ? 0 : currentTab}
        onChange={(_, newValue) => navigate(tabs[newValue].path)}
        aria-label="navigation tabs"
      >
        {tabs.map((tab) => (
          <Tab key={tab.path} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default MultiTabs;
