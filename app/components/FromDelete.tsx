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
import { toast } from "react-hot-toast";

interface ConfirmDeleteDialogProps {
  open: boolean;
  slug?: string;
  title?: string;
  onClose: () => void;
  onDeleted?: () => void;
}

export default function ConfirmDeleteDialog({ 
  open,
  title,
  slug, 
  onClose, 
  onDeleted 
}: ConfirmDeleteDialogProps) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleConfirmDelete = async () => {
    if (!slug) return;
    try {
      const res = await fetch(`/api/book/${slug}`,
      { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Đã xóa sách thành công!");
        onDeleted?.();
      } else {
        toast.error(data.message || "Xóa sách thất bại!");
      }
    } catch (err: any) {
      console.error("Lỗi khi xóa:", err);
      toast.error("Không thể kết nối đến máy chủ!");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="delete-book-dialog-title"
    >
      <DialogTitle id="delete-book-dialog-title" className="text-red-600 font-bold">
        Xác nhận xóa sách {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn <strong>xóa</strong> sách này không?  
          Hành động này <strong>không thể hoàn tác</strong>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Hủy
        </Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}
