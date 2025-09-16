import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useWebSocket } from "../hooks/useWebSocket";
import { ChatMessage } from "../types/message";

export const ChatWindow: React.FC<{ ticketId: string }> = ({ ticketId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useWebSocket({
    url: process.env.REACT_APP_WS_URL || "ws://localhost:8080/ws",
    topics: [`/topic/tickets/${ticketId}/messages`],
    onMessage: (_, message) => {
      const newMsg: ChatMessage = JSON.parse(message.body);
      setMessages((prev) => [...prev, newMsg]);
    },
  });

  return (
    <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2, height: 300, overflowY: "auto" }}>
      <Typography variant="h6">Chat</Typography>
      {messages.map((msg) => (
        <Box key={msg.id} sx={{ mb: 1 }}>
          <Typography variant="body2"><b>{msg.sender}</b>: {msg.content}</Typography>
          <Typography variant="caption" color="text.secondary">{msg.timestamp}</Typography>
        </Box>
      ))}
    </Box>
  );
};
