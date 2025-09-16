import React from "react";
import { Button, ButtonProps } from "@mui/material";

type AppButtonProps = ButtonProps & {
  label: string;
};

export const SubmitButton: React.FC<AppButtonProps> = ({ label, ...props }) => {
  return <Button variant="contained" {...props}>{label}</Button>;
};
