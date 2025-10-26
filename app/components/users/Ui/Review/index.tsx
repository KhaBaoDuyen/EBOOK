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
    Divider,
    Fade,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import RatingCommentDialog from "../CommentDialog/index";
import type IReview from "./Review.interface";


export default function ReviewTabsLayout({ bookInfo, reviews }: IReview) {
    const [tab, setTab] = React.useState(1);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [visibleCount, setVisibleCount] = React.useState(5);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const handleSubmitReview = (newReview: any) => {
        setOpenDialog(false);
    };
    return (
        <Box sx={{
            color: "#fff",
            backdropFilter: "blur(12px) saturate(160%)",
            borderRadius: 3, p: 2,

        }}>
            <Tabs
                value={tab}
                onChange={handleTabChange}
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
                <Tab label={`Đánh giá & nhận xét (${reviews.length})`} value={1} />
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
                                    5.0
                                </Typography>
                                <Rating
                                    value={5}
                                    readOnly
                                    sx={{
                                        "& .MuiRating-iconFilled": { color: "#FFD700" },
                                        "& .MuiRating-iconEmpty": { color: "#ffffff" },
                                    }}
                                />
                                <Typography variant="body2" color="#9ca3af">
                                    4 đánh giá
                                </Typography>
                            </Box>

                            <Box sx={{ width: { xs: "100%", sm: "65%" } }}>
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <Stack
                                        key={star}
                                        direction="row"
                                        alignItems="center"
                                        spacing={1}
                                        sx={{ mb: 0.5 }}
                                    >
                                        <Rating
                                            value={star}
                                            readOnly
                                            size="small"
                                            sx={{
                                                "& .MuiRating-iconFilled": { color: "#FFD700" },
                                                "& .MuiRating-iconEmpty": { color: "#ffffff" },
                                            }}
                                        />
                                        <LinearProgress
                                            variant="determinate"
                                            value={star === 5 ? 100 : 0}
                                            sx={{
                                                flexGrow: 1,
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: "#374151",
                                                "& .MuiLinearProgress-bar": { backgroundColor: "#FFD700" },
                                            }}
                                        />
                                    </Stack>
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
                        {reviews.slice(0, visibleCount).map((item) => (
                            <Fade in key={item._id}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        backgroundColor: "#1C1C1E",
                                        p: 2,
                                        borderRadius: 2,
                                    }}
                                >
                                    <Avatar
                                        src={item.userId?.avatar}
                                        sx={{
                                            width: 42,
                                            height: 42,
                                            bgcolor: "#10b981",
                                            mr: 2,
                                            fontSize: 14,
                                        }}
                                    >
                                        {!item.userId?.avatar
                                            ? item.userId?.name?.charAt(0)?.toUpperCase()
                                            : ""}
                                    </Avatar>

                                    <Box sx={{ flexGrow: 1 }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
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
                                            sx={{
                                                mt: 0.5,
                                                "& .MuiRating-iconFilled": { color: "#FFD700" },
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Fade>
                        ))}

                        {visibleCount < reviews.length && (
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
