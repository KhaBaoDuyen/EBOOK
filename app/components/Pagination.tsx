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
  const siblingCount = totalPages > 6 ? 1 : totalPages;
  const boundaryCount = totalPages > 6 ? 1 : totalPages;

  return (
    <Stack spacing={2} alignItems="center" marginTop={3}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => onPageChange(value)}
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              color: "var(--input-text)",
              backgroundColor: "var(--input-bg)",
              border: "1px solid var(--input-border)",
              transition: "all 0.3s ease",
              "&.Mui-selected": {
                backgroundColor: "var(--input-border-focus)",
                color: "#fff",
                borderColor: "var(--input-border-focus)",
              },
              "&:hover": {
                backgroundColor: "var(--input-border-hover)",
                color: "#fff",
              },
              "&.MuiPaginationItem-ellipsis": {
                color: "var(--input-text-disabled)",
                backgroundColor: "transparent",
                border: "none",
              },
            }}
          />
        )}
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "8px",
          },
        }}
      />
    </Stack>
  );
};

export default PaginationComponent;
