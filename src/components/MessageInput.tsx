import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export const MessageInput: React.FC<{ onSend: (text: string, file?: File) => void }> = ({ onSend }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSend = () => {
    if (text.trim() || file) {
      onSend(text, file || undefined);
      setText("");
      setFile(null);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
      <TextField
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ display: "none" }}
        id="upload-file"
      />
      <label htmlFor="upload-file">
        <Button component="span" variant="outlined">📎</Button>
      </label>
      <Button variant="contained" onClick={handleSend}>Send</Button>
    </Box>
  );
};
