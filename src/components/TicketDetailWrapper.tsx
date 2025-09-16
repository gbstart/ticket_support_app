import React from "react";
import { useParams } from "react-router-dom";
import { ticketsData } from "../data/data";
import { TicketDetail } from "../pages/TicketDetails";
import { Typography } from "@mui/material";
import TitleSection from "./TitleSection";

const TicketDetailWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const ticket = ticketsData.find((t) => t.id === id);

  return (
    <>
      <TitleSection />

      {ticket ? (
        <TicketDetail ticket={ticket} />
      ) : (
        <Typography>Ticket not found</Typography>
      )}
    </>
  );
};

export default TicketDetailWrapper;
