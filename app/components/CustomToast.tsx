import { Snackbar, Alert } from "@mui/material";
import React from "react";

export interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export default function CustomToast({
  toast,
  setToast,
}: {
  toast: ToastState;
  setToast: React.Dispatch<React.SetStateAction<ToastState>>;
}) {
  const handleClose = () => setToast((prev) => ({ ...prev, open: false }));

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={toast.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
}
