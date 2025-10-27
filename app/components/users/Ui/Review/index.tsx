import * as React from "react";
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Rating,
    Button,
    Avatar,
    LinearProgress,
    Stack,
    Fade,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState, useEffect } from "react";
import { useUser } from "~/context/UserContext";
import { getIsReviews, deleteReview } from "~/services/review.service";
import RatingCommentDialog from "../CommentDialog";
import ConfirmDeleteDialog from "~/components/FromDelete";
import type IReview from "./Review.interface";

export default function ReviewTabsLayout({ bookInfo }: IReview) {
    const [tab, setTab] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5);
    const [review, setReview] = useState<any[]>([]);
    const { userData } = useUser();

    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const nameBook = bookInfo?.slug;

    //---------------[ Lấy danh sách review]----------------------
    const getAllReview = async (slug: string) => {
        if (!slug) return;
        try {
            const res = await getIsReviews(slug);
            setReview(res.reviews || []);
            console.log("review", res.reviews);

        } catch (error) {
            console.error("Lỗi khi gọi API REVIEW:", error);
        }
    };

    //------------------[ Tinh trung binh review]--------------------
    const totalReview = review.length;

    const averageRating =
        totalReview > 0
            ? (review.reduce((sum, item) => sum + (item.rating || 0), 0) / totalReview).toFixed(1)
            : 0;

    const starPercent = [5, 4, 3, 2, 1].map((star) => {
        const count = review.filter((r) => r.rating === star).length;
        const percent = totalReview ? (count / totalReview) * 100 : 0;
        return { star, percent };
    });

    useEffect(() => {
        getAllReview(nameBook);
    }, [nameBook]);

    //--------------- [ Hàm mở/xác nhận dialog xóa]-----------------
    const handleOpenConfirm = (id: string) => {
        setSelectedId(id);
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => setOpenConfirm(false);

    const handleConfirmDelete = async () => {
        if (!selectedId) return;
        try {
            await deleteReview(selectedId);
            await getAllReview(nameBook);
        } catch (error) {
            console.error("Lỗi khi xóa đánh giá:", error);
        } finally {
            setOpenConfirm(false);
            setSelectedId(null);
        }
    };

    const handleSubmitReview = () => {
        getAllReview(nameBook);
        setOpenDialog(false);
    };

    return (
        <Box sx={{
            color: "#fff",
            backdropFilter: "blur(12px) saturate(160%)",
            borderRadius: 3, p: 2,

        }}>
            <p>{userData?.name}</p>
            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                textColor="inherit"
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "#10b981",
                        height: 3,
                        borderRadius: 2,
                        paddingBottom: 5,
                    },
                }}
                sx={{
                    mb: 2,
                    borderBottom: "1px solid rgba(255,255,255,0.3)",
                    "& .MuiTab-root": {
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#9ca3af",
                        "&.Mui-selected": { color: "#fff" },
                    },
                }}
            >
                <Tab label="Bình luận (1)" value={0} />
                <Tab label={`Đánh giá & nhận xét (${review.length})`} value={1} />
            </Tabs>

            {tab === 0 && (
                <Box sx={{ mt: 2, textAlign: "center", color: "#9ca3af" }}>
                    <Typography>Chưa có bình luận nào.</Typography>
                </Box>
            )}

            {tab === 1 && (
                <Box sx={{ mt: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            backgroundColor: "#1C1C1E",
                            p: 3,
                            borderRadius: 2,
                            mb: 3,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 3,
                            }}
                        >
                            <Box sx={{ textAlign: "center", width: { xs: "100%", sm: "30%" } }}>
                                <Typography variant="h3" fontWeight={700} color="#fff">
                                    {averageRating}
                                </Typography>
                                <Rating
                                    value={Number(averageRating)}
                                    precision={0.5}
                                    readOnly
                                    sx={{
                                        "& .MuiRating-iconFilled": { color: "#FFD700" },
                                        "& .MuiRating-iconEmpty": { color: "#ffffff" },
                                    }}
                                />
                                <Typography variant="body2" color="#9ca3af">
                                    {totalReview} đánh giá
                                </Typography>
                            </Box>

                            <Box sx={{ width: { xs: "100%", sm: "65%" } }}>
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <Box
                                        key={star}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            mb: 0.8,
                                        }}
                                    >
                                        <Rating
                                            value={star}
                                            readOnly
                                            size="small"
                                            sx={{
                                                minWidth: 110,
                                                "& .MuiRating-iconFilled": { color: "#FFD700" },
                                                "& .MuiRating-iconEmpty": { color: "#ffffff" },
                                            }}
                                        />
                                        <LinearProgress
                                            variant="determinate"
                                            value={starPercent.find((s) => s.star === star)?.percent || 0}
                                            sx={{
                                                flexGrow: 1,
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: "#374151",
                                                "& .MuiLinearProgress-bar": { backgroundColor: "#FFD700" },
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>

                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button
                                variant="contained"
                                startIcon={<RateReviewIcon />}
                                onClick={() => setOpenDialog(true)}
                                sx={{
                                    borderRadius: 15,
                                    backgroundColor: "#10b981",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    px: 4,
                                    py: 1.5,
                                    "&:hover": { backgroundColor: "#059669" },
                                }}
                            >
                                Viết đánh giá
                            </Button>
                        </Box>
                    </Box>

                    <Stack spacing={2}>
                        {review.slice(0, visibleCount).map((item) => (
                            <Fade in key={item._id}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        backgroundColor: "#1C1C1E",
                                        p: 2,
                                        borderRadius: 2,
                                        position: "relative",
                                        "&:hover .delete-icon": { opacity: 1, transform: "translateY(0)" },
                                    }}
                                >
                                    <Avatar
                                        src={item.userId?.avatar}
                                        sx={{ width: 42, height: 42, bgcolor: "#10b981", mr: 2 }}
                                    >
                                        {!item.userId?.avatar
                                            ? item.userId?.name?.charAt(0)?.toUpperCase()
                                            : ""}
                                    </Avatar>

                                    <Box sx={{ flexGrow: 1 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography fontWeight={600}>
                                                {item.userId?.name || "Người dùng ẩn danh"}
                                            </Typography>
                                            <Typography variant="body2" color="#9ca3af">
                                                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                                            </Typography>
                                        </Stack>
                                        <Typography sx={{ mt: 0.5 }}>{item.comment}</Typography>
                                        <Rating
                                            value={item.rating}
                                            readOnly
                                            size="small"
                                            sx={{ mt: 0.5, "& .MuiRating-iconFilled": { color: "#FFD700" } }}
                                        />
                                    </Box>

                                    {(String(userData?._id) === String(item.userId?._id) ||
                                        userData?.role === "admin") && (
                                            <DeleteOutlineIcon
                                                onClick={() => handleOpenConfirm(item._id)}
                                                className="delete-icon"
                                                sx={{
                                                    position: "absolute",
                                                    bottom: 10,
                                                    right: 10,
                                                    fontSize: 22,
                                                    color: "#9ca3af",
                                                    cursor: "pointer",
                                                    opacity: 0,
                                                    transform: "translateY(-5px)",
                                                    transition: "all 0.25s ease",
                                                    "&:hover": { color: "#ef4444", transform: "scale(1.1)" },
                                                }}
                                                titleAccess="Xóa bình luận"
                                            />
                                        )}
                                </Box>
                            </Fade>
                        ))}

                        {visibleCount < review.length && (
                            <Box sx={{ textAlign: "center", mt: 2 }}>
                                <Button
                                    onClick={() => setVisibleCount((prev) => prev + 5)}
                                    variant="outlined"
                                    sx={{
                                        color: "#10b981",
                                        borderColor: "rgba(255,255,255,0.2)",
                                        borderRadius: 3,
                                        textTransform: "none",
                                        fontWeight: 600,
                                        "&:hover": {
                                            backgroundColor: "rgba(16,185,129,0.1)",
                                            borderColor: "#10b981",
                                        },
                                    }}
                                >
                                    Xem thêm bình luận
                                </Button>
                            </Box>
                        )}
                    </Stack>

                    <ConfirmDeleteDialog
                        open={openConfirm}
                        onClose={handleCloseConfirm}
                        onConfirmDelete={handleConfirmDelete}
                        title="bình luận này"
                    />

                </Box>
            )}

            <RatingCommentDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSubmit={handleSubmitReview}
                bookId={bookInfo?._id}
            />
        </Box>
    );
}
