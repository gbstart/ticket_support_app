import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TicketList } from "./pages/TicketList";
import { TicketCreateForm } from "./pages/TicketCreateForm";
import TicketDetailWrapper from "./components/TicketDetailWrapper";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TicketList />} />
        <Route path="/create" element={<TicketCreateForm />} />
        <Route path="/ticket/:id" element={<TicketDetailWrapper />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
