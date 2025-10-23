import type { TextFieldProps } from "@mui/material";
import  { TextField } from "@mui/material";
import React from "react";

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  const { error, helperText, ...rest } = props;

  return (
    <TextField
      {...rest}
      error={error}
      helperText={helperText}
      fullWidth
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "var(--input-text)",
          backgroundColor: "var(--input-bg)",
          borderRadius: "8px",
          transition: "all 0.3s ease",

          "& fieldset": {
            borderColor: error
              ? "var(--input-border-error)"
              : "var(--input-border)",
          },
          "&:hover fieldset": {
            borderColor: error
              ? "var(--input-border-error)"
              : "var(--input-border-hover)",
          },
          "&.Mui-focused fieldset": {
            borderColor: error
              ? "var(--input-border-error)"
              : "var(--input-border-focus)",
          },

          "&.Mui-disabled fieldset": {
            borderColor: "var(--input-border-disabled) !important",
          },

          "&.Mui-disabled": {
            "& input": {
              WebkitTextFillColor: "var(--input-text-disabled)",
              color: "var(--input-text-disabled)",
              opacity: 1,
            },
          },
        },

        "& .MuiInputLabel-root": {
          color: error
            ? "var(--input-label-error)"
            : "var(--input-label-default)",
          "&.Mui-focused": {
            color: error
              ? "var(--input-label-error)"
              : "var(--input-label-focus)",
          },
          "&.Mui-disabled": {
            color: "var(--input-label-disabled) !important",
            opacity: 1,
          },
        },

        "& .MuiFormHelperText-root": {
          color: error
            ? "var(--input-helper-error)"
            : "var(--input-helper-default)",
        },
      }}
    />
  );
};

export default CustomTextField;
