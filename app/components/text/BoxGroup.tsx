import * as React from "react";
import { Autocomplete, TextField, Box } from "@mui/material";

interface CustomComboBoxProps<T> {
    label?: string; // label hiển thị  
    options: T[]; // dữ liệu truyền vào
    value?: T | null;
    getOptionLabel?: (option: T) => string; // cách hiển thị label từng option
    onChange?: (value: T | null) => void; // sự kiện khi chọn
    sx?: object; // style tùy chỉnh thêm
}

export default function CustomComboBox<T>({
    label = "Chọn mục",
    options,
    value,
    getOptionLabel,
    onChange,
    sx = {},
}: CustomComboBoxProps<T>) {
    return (
        <Box sx={{ ...sx }}>
            <Autocomplete
                disablePortal
                value={value || null}
                options={options}
                getOptionLabel={(option) =>
                    getOptionLabel ? getOptionLabel(option) : String(option)
                }
                sx={{
                    "& .MuiOutlinedInput-root": {
                        color: "white",
                        backgroundColor: "#1F2937",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E5E5E5",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#93C5FD",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "white",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#93C5FD",
                    },
                    "& .MuiAutocomplete-listbox": {
                        backgroundColor: "#1F2937",
                        color: "white",
                    },
                    "& .MuiAutocomplete-option": {
                        color: "white",
                        "&[aria-selected='true']": {
                            backgroundColor: "#374151",
                        },
                        "&:hover": {
                            backgroundColor: "#4B5563",
                        },
                    },
                }}
                renderInput={(params) => (
                    <TextField {...params} label={label} variant="outlined" />
                )}
                onChange={(_, value) => onChange && onChange(value)}
            />
        </Box>
    );
}
