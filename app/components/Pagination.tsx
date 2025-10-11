import React from "react";
import { Stack, Pagination, PaginationItem } from "@mui/material";
import type { TPagination } from "~/types/pagination";

const PaginationComponent: React.FC<TPagination> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Nếu tổng số trang <= 6 hiển thị toàn bộ
  const siblingCount = totalPages > 6 ? 1 : totalPages;
  const boundaryCount = totalPages > 6 ? 1 : totalPages;

  return (
    <Stack spacing={2} alignItems="center" marginTop={3}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => onPageChange(value)}
        color="primary"
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              color: "white",
              "&.Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
              },
              "&.MuiPaginationItem-ellipsis": {
                color: "#9ca3af",
              },
            }}
          />
        )}
        sx={{
          "& .MuiPaginationItem-ellipsis": {
            color: "#9ca3af",
          },
        }}
      />
    </Stack>
  );
};

export default PaginationComponent;
