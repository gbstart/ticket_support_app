import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useWebSocket } from "../hooks/useWebSocket";
import { Ticket } from "../types/ticket";
import { Box, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../components/SubmitButton";
import { mockTickets } from "../data/data";
import TitleSection from "../components/TitleSection";

export const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const navigate = useNavigate();

  useWebSocket({
    url: process.env.WS_URL || "ws://localhost:8080/ws",
    topics: ["/topic/tickets"],
    onMessage: (_, message) => {
      const updatedTicket: Ticket = JSON.parse(message.body);
      setTickets((prev) =>
        prev.some((t) => t.id === updatedTicket.id)
          ? prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
          : [...prev, updatedTicket]
      );
    },
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, sortable: true },
    { field: "subject", headerName: "Subject", flex: 2, sortable: true },
    { field: "status", headerName: "Status", flex: 1, sortable: true },
    { field: "priority", headerName: "Priority", flex: 1, sortable: true },
    { field: "assignee", headerName: "Assignee", flex: 1, sortable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <SubmitButton
          label="view"
          onClick={() => navigate(`/ticket/${params.row.id}`)}
        ></SubmitButton>
      ),
      sortable: false,
    },
  ];

  const filteredTickets = statusFilter
    ? tickets.filter((t) => t.status === statusFilter)
    : tickets;

  return (
    <Box>
      <TitleSection />
      <TextField
        select
        label="Filter by Status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        sx={{ mb: 2, minWidth: 200 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="open">Open</MenuItem>
        <MenuItem value="in_progress">In Progress</MenuItem>
        <MenuItem value="closed">Closed</MenuItem>
      </TextField>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filteredTickets}
          columns={columns}
          getRowId={(row) => row.id}
          onRowClick={(params) => navigate(`/ticket/${params.id}`)}
          pageSizeOptions={[5, 10, 20]}
          pagination
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
        />
      </div>
    </Box>
  );
};
