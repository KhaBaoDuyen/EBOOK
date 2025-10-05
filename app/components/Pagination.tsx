import React from "react";
import { Stack, Pagination } from "@mui/material";
import type { TPagination } from "~/types/pagination";

const PaginationComponent: React.FC<TPagination> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <Stack spacing={2} alignItems="center" marginTop={3}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => onPageChange(value)}
                color="primary"
                sx={{
                    "& .MuiPaginationItem-root": {
                        color: "white",
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                        color: "white",
                    },
                }}
            />
        </Stack>
    );
};

export default PaginationComponent;
