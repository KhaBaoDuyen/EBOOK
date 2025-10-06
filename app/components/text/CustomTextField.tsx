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
          backgroundColor: "#1F2937",  
          "& fieldset": {
            borderColor: "#aaa",  
          },
          "&:hover fieldset": {
            borderColor: "#fff",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4ade80",  
          },
        },
        "& .MuiInputLabel-root": {
          color: "#ccc",  
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#4ade80", 
        },
      }}
    />
  );
};

export default CustomTextField;
