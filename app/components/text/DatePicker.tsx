import * as React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { vi } from "date-fns/locale";

interface CustomDatePickerProps {
  label?: string;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
}

export default function CustomDatePicker({
  label = "Chọn ngày",
  value,
  onChange,
  onBlur,
  error,
  helperText,
}: CustomDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
            variant: "outlined",
            onBlur,
            error,
            helperText,
            sx: {
              width: "100%",
              borderRadius: "8px",
              backgroundColor: "var(--input-bg)",
              transition: "all 0.3s ease",

               "& .MuiInputBase-input, & .MuiOutlinedInput-input, & .MuiPickersInputBase-input":
                {
                  color: "var(--input-text)",
                  caretColor: "var(--input-border-focus)",
                },
              "& input::placeholder": {
                color: "var(--input-text-disabled)",
                opacity: 0.8,
              },

               "& svg": {
                color: error
                  ? "var(--input-border-error)"
                  : "var(--input-text)",
              },

               "& fieldset": {
                borderColor: error
                  ? "var(--input-border-error)"
                  : "var(--input-border)",
                borderWidth: "1px",
                borderStyle: "solid",
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
                borderWidth: "2px",
              },

               "& .MuiInputLabel-root": {
                color: error
                  ? "var(--input-label-error)"
                  : "var(--input-label-default)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: error
                  ? "var(--input-label-error)"
                  : "var(--input-label-focus)",
              },
              "& .MuiInputLabel-root.Mui-disabled": {
                color: "var(--input-label-disabled)",
              },

               "& .MuiFormHelperText-root": {
                color: error
                  ? "var(--input-helper-error)"
                  : "var(--input-helper-default)",
              },

               "&.Mui-disabled fieldset": {
                borderColor: "var(--input-border-disabled)",
              },
              "&.Mui-disabled .MuiInputBase-input": {
                color: "var(--input-text-disabled)",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
