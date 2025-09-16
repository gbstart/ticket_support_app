import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useController, Control } from "react-hook-form";

type FileUploadProps = {
  name: string;
  control: Control<any>;
  accept?: string[];
  maxSizeMB?: number;
};

export const FileUpload: React.FC<FileUploadProps> = ({
  name,
  control,
  accept = ["image/*"],
  maxSizeMB = 5,
}) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size
    if (file.size / 1024 / 1024 > maxSizeMB) {
      alert(`File size exceeds ${maxSizeMB} MB`);
      return;
    }

    // Validate type
    if (!accept.some((type) => file.type.match(type))) {
      alert(`File type not allowed`);
      return;
    }

    onChange(file);
  };

  return (
    <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Button variant="text" component="label">
        Upload File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb:5 }}>
    
      {preview && (
        <Box sx={{ mt: 1 }}>
          {value.type.startsWith("image/") && (
            <img src={preview} alt="preview" style={{ maxHeight: 150 }} />
          )}
          {value.type.startsWith("video/") && (
            <video src={preview} controls style={{ maxHeight: 150 }} />
          )}
          {value.type === "application/pdf" && (
            <Typography>PDF File: {value.name}</Typography>
          )}
        </Box>
      )}
      {error && <Typography color="error">{error.message}</Typography>}
    </Box>
    </Box>
  );
};
