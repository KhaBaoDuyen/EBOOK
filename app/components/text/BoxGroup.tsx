import * as React from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import { Paper, autocompleteClasses } from "@mui/material";

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
            stroke={error ? "#f87171" : "#fff"}
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
            className={`
    flex items-center justify-between gap-3
    px-4 py-2.5 rounded-md transition-all duration-200
    ${option._id === "__add_new__"
                ? "text-green-400 font-semibold hover:bg-green-500/10"
                : "text-gray-100 hover:bg-gray-700/40"
              }
  `}
          >
            <span className="truncate text-[15px] tracking-wide">
              {option.name || getOptionLabel?.(option) || String(option)}
            </span>

            {option._id === "__add_new__" && (
              <span className="text-green-400 text-lg font-bold flex items-center">＋</span>
            )}
          </li>

        )}

        PaperComponent={(props) => (
          <Paper
            {...props}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white !important",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
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
                color: "#fff",
                backgroundColor: "#1F2937",
                borderRadius: "8px",
              },
              "& .MuiInputLabel-root": {
                color: error ? "#f87171" : "rgba(255,255,255,0.7)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: error ? "#f87171" : "#ffffff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: error ? "#f87171" : "rgba(255,255,255,0.4)",
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

      />

    </Box>
  );
}
