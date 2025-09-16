import React, { ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AppButton } from "./SubmitButton";

type AppModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  children: ReactNode;
};

export const AppModal: React.FC<AppModalProps> = ({
  open,
  title,
  onClose,
  onConfirm,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <AppButton label="Close" onClick={onClose} />
        {onConfirm && <AppButton label="Confirm" onClick={onConfirm} />}
      </DialogActions>
    </Dialog>
  );
};
