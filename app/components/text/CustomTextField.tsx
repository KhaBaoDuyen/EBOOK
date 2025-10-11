import { TextField, TextFieldProps } from "@mui/material";
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
          color: "white",
          backgroundColor: "#1F2937",
          borderRadius: "8px",
          "& fieldset": { borderColor: error ? "#f87171" : "#aaa" },
          "&:hover fieldset": { borderColor: error ? "#f87171" : "#fff" },
          "&.Mui-focused fieldset": {
            borderColor: error ? "#f87171" : "#4ade80",
          },
        },
        "& .MuiInputLabel-root": {
          color: error ? "#f87171" : "#ccc",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: error ? "#f87171" : "#4ade80",
        },
        "& .MuiFormHelperText-root": {
          color: error ? "#f87171" : "#ccc",
        },
      }}
    />
  );
};

export default CustomTextField;
