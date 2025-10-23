import * as React from "react";
import { Autocomplete, TextField, Box, Paper } from "@mui/material";

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
  onAddNew?: () => void;
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
  onAddNew,
}: CustomComboBoxProps<T>) {
  const extendedOptions = React.useMemo(() => {
    if (onAddNew) {
      return [{ _id: "__add_new__", name: "+ Thêm mới" } as any, ...options];
    }
    return options;
  }, [options, onAddNew]);

  return (
    <Box sx={{ ...sx }}>
      <Autocomplete
        disablePortal
        value={value || null}
        options={extendedOptions}
        onBlur={onBlur}
        getOptionLabel={(option: any) =>
          getOptionLabel ? getOptionLabel(option) : String(option)
        }
        popupIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke={error ? "#f87171" : "var(--input-text)"}
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        }
        onChange={(_, newValue: any) => {
          if (newValue?._id === "__add_new__") {
            onAddNew?.();
            return;
          }
          onChange?.(newValue);
        }}
        renderOption={(props, option: any) => (
          <li
            {...props}
            className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-md transition-all duration-200
              ${option._id === "__add_new__"
                ? "text-green-500 font-semibold hover:bg-green-500/10"
                : "text-[var(--input-text)] hover:bg-[var(--input-border)]/10"
              }`}
          >
            <span className="truncate text-[15px] tracking-wide">
              {option.name || getOptionLabel?.(option) || String(option)}
            </span>
            {option._id === "__add_new__" && (
              <span className="text-green-500 text-lg font-bold flex items-center">
                ＋
              </span>
            )}
          </li>
        )}
        PaperComponent={(props) => (
          <Paper
            {...props}
            sx={{
              backgroundColor: "var(--input-bg)",
              color: "var(--input-text)",
              border: "1px solid var(--input-border)",
              backdropFilter: "blur(8px)",
              borderRadius: "10px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              "& .MuiAutocomplete-listbox": {
                paddingY: "6px",
                paddingX: "2px",
              },
              "& .MuiAutocomplete-option": {
                borderRadius: "6px",
                transition: "background-color 0.2s ease",
                "&[aria-selected='true']": {
                  backgroundColor: "rgba(74, 222, 128, 0.25)",
                },
              },
            }}
          />
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={error}
            helperText={helperText}
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                color: "var(--input-text)",
                backgroundColor: "var(--input-bg)",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              },
              "& .MuiInputLabel-root": {
                color: error ? "#f87171" : "var(--input-text-disabled)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: error ? "#f87171" : "#22c55e",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: error ? "#f87171" : "var(--input-border)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: error ? "#f87171" : "var(--input-text)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: error ? "#f87171" : "#22c55e",
                borderWidth: "2px",
              },
              "& input": {
                color: "var(--input-text)",
              },
              "& svg": {
                color: error ? "#f87171" : "var(--input-text)",
              },
              "& .MuiFormHelperText-root": {
                color: error ? "#f87171" : "var(--input-text-disabled)",
              },
            }}
          />
        )}
      />
    </Box>
  );
}
