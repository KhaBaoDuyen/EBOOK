import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ConfirmDeleteDialogProps {
  open: boolean;
  title?: string;            
  onClose: () => void;       
  onConfirmDelete: () => Promise<void> | void;  
}

export default function ConfirmDeleteDialog({
  open,
  title,
  onClose,
  onConfirmDelete,
}: ConfirmDeleteDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirmDelete(); 
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-delete-dialog-title"
    >
      <DialogTitle id="confirm-delete-dialog-title" className="text-red-600 font-bold">
        Xác nhận xóa {title ? `"${title}"` : ""}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn <strong>xóa</strong> mục này không?  
          Hành động này <strong>không thể hoàn tác</strong>.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Hủy
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          autoFocus
          disabled={loading}
        >
          {loading ? "Đang xóa..." : "Xóa"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
