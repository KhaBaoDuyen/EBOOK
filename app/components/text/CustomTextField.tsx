import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      fullWidth
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "white",
          backgroundColor: "#1F2937", // nền xám nhẹ
          "& fieldset": {
            borderColor: "#aaa", // viền xám trắng
          },
          "&:hover fieldset": {
            borderColor: "#fff",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4ade80", // xanh lá khi focus
          },
        },
        "& .MuiInputLabel-root": {
          color: "#ccc", // label xám trắng
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#4ade80", // label xanh khi focus
        },
      }}
    />
  );
};

export default CustomTextField;
