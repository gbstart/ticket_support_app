import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export const AppInput: React.FC<TextFieldProps> = (props) => {
  return <TextField fullWidth variant="outlined" {...props} />;
};
