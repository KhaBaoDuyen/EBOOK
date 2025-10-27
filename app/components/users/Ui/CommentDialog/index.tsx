import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    TextField,
    Button,
    Box,
    Typography,
    Rating,
    Alert,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type IRatingComment from "./RatingComment.interface";
import { createReview } from "~/services/review.service";
import { useNotify } from "~/context/NotifyContext";

export default function RatingCommentDialog({
    open,
    onClose,
    onSubmit,
    bookId,
}: IRatingComment & { bookId: string }) {
    const [rating, setRating] = React.useState<number | null>(0);
    const [comment, setComment] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [userData, setUserData] = React.useState();
    const { setNotify } = useNotify();
    const maxChars = 300;

    React.useEffect(() => {
        if (!open) {
            setError(null);
            setSuccess(false);
            setComment("");
            setRating(0);
        }
    }, [open]);

    const handleSubmit = async () => {
        if (!rating || rating < 1) {
            setError("Vui lòng chọn số sao đánh giá");
            return;
        }
        if (!userData) {
            setNotify({
                open: true,
                type: "warning",
                title: "Vui lòng đăng nhập",
                message: "Vui lòng đăng nhập để có thể bình luận sách. Xin cảm ơn!!!"
            })
        }
        setError(null);
        setLoading(true);
        try {
            await createReview({
                bookId,
                rating,
                comment,
            });
            setSuccess(true);
            setRating(0);
            setComment("");
            onSubmit?.(rating, comment);
        } catch (err: any) {
            console.log(err.message || "Không thể gửi đánh giá. Vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    backgroundColor: "rgba(15, 23, 42, 0.6)",
                    backdropFilter: "blur(12px) saturate(160%)",
                    color: "#fff",
                    width: "100%",
                    maxWidth: 500,
                    border: "1px solid rgba(255,255,255,0.1)",
                },
            }}
        >
            <DialogTitle
                sx={{
                    m: 0,
                    p: 2,
                    textAlign: "center",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                }}
            >
                Đánh giá và nhận xét
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 12,
                        top: 12,
                        color: "#aaa",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ px: 4, pb: 2 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert
                        severity="success"
                        sx={{
                            mb: 2,
                            borderRadius: 2,
                            backgroundColor: "rgba(16,185,129,0.2)",
                            color: "#10b981",
                        }}
                    >
                        Gửi đánh giá thành công!
                    </Alert>
                )}

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography sx={{ fontWeight: 500 }}>Đánh giá</Typography>
                    <Rating
                        name="user-rating"
                        value={rating}
                        onChange={(_, newValue) => setRating(newValue)}
                        size="large"
                        sx={{
                            mb: 2,
                            "& .MuiRating-iconFilled": { color: "#FFD700" },
                            "& .MuiRating-iconHover": { color: "#FFCA28" },
                            "& .MuiRating-iconEmpty": { color: "#ffffff" },
                        }}
                    />
                </Box>

                <Typography sx={{ mb: 1, fontWeight: 500 }}>Nhận xét</Typography>
                <TextField
                    multiline
                    minRows={4}
                    fullWidth
                    placeholder="Hãy cho chúng mình một vài nhận xét và đóng góp ý kiến nhé"
                    value={comment}
                    onChange={(e) => setComment(e.target.value.slice(0, maxChars))}
                    InputProps={{
                        sx: {
                            borderRadius: 2,
                            backgroundColor: "#1f2937",
                            color: "#fff",
                        },
                    }}
                />
                <Box
                    sx={{
                        textAlign: "right",
                        mt: 0.5,
                        color: "#9ca3af",
                        fontSize: 12,
                    }}
                >
                    {comment.length}/{maxChars}
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 4, pb: 3 }}>
                <Button
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    onClick={handleSubmit}
                    sx={{
                        borderRadius: 15,
                        backgroundColor: "#10b981",
                        textTransform: "none",
                        fontWeight: 600,
                        py: 1.2,
                        "&:hover": { backgroundColor: "#059669" },
                    }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Gửi nhận xét"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
