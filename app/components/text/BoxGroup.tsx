import * as React from "react";
import { Autocomplete, TextField, Box } from "@mui/material";

interface CustomComboBoxProps<T> {
  label?: string;
  options: T[];
  value?: T | null;
  getOptionLabel?: (option: T) => string;
  onChange?: (value: T | null) => void;
  sx?: object;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
}

export default function CustomComboBox<T>({
  label = "Chọn mục",
  options,
  value,
  getOptionLabel,
  onChange,
  sx = {},
  onBlur,
  error = false,
  helperText,
}: CustomComboBoxProps<T>) {
  return (
    <Box sx={{ ...sx }}>
      <Autocomplete
        disablePortal
        value={value || null}
        options={options}
        onBlur={onBlur}
        getOptionLabel={(option) =>
          getOptionLabel ? getOptionLabel(option) : String(option)
        }
        popupIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke={error ? "#f87171" : "#fff"}
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        }
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
            backgroundColor: "#1F2937",
            borderRadius: "8px",
            transition: "all 0.2s ease-in-out",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "#f87171" : "#aaa",
              borderWidth: "1px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "#f87171" : "#fff",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "#f87171" : "#4ade80",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            color: error ? "#f87171" : "#ccc",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: error ? "#f87171" : "#4ade80",
          },
          "& .MuiAutocomplete-listbox": {
            backgroundColor: "#1F2937",
            color: "white",
            borderRadius: "6px",
            padding: "4px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          },
          "& .MuiAutocomplete-option": {
            color: "white",
            borderRadius: "6px",
            transition: "background-color 0.2s ease",
            "&[aria-selected='true']": {
              backgroundColor: "#374151",
            },
            "&:hover": {
              backgroundColor: "#4B5563",
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={error}
            helperText={helperText}
            sx={{
              "& .MuiInputBase-root": {
                color: "white",
                backgroundColor: "#1F2937",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
              },
              "& .MuiInputLabel-root": {
                color: error ? "#f87171" : "#ccc",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: error ? "#f87171" : "#aaa",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: error ? "#f87171" : "#fff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: error ? "#f87171" : "#4ade80",
                borderWidth: "2px",
              },
              "& input": {
                color: "#fff",
              },
              "& svg": {
                color: error ? "#f87171" : "#fff",
              },
            }}
          />
        )}
        onChange={(_, value) => onChange && onChange(value)}
      />
    </Box>
  );
}
