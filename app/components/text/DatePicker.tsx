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
                            width: '100%',
                            borderRadius: "8px",
                            "& .MuiInputBase-input, & .MuiOutlinedInput-input, & .MuiPickersInputBase-input": {
                                color: "#fff !important",
                                caretColor: "#4ade80",
                            },
                            "& input::placeholder": {
                                color: "#fff !important",
                                opacity: 0.8,
                            },
                            "& input": {
                                color: "#fff !important",
                            },
                            "& svg": {
                                color: error ? "#f87171 !important" : "#fff !important",
                            },

                            "& fieldset": {
                                borderColor: error
                                    ? "#f87171 !important"
                                    : "#aaa !important",
                                borderWidth: "1px !important",
                                borderStyle: "solid !important",
                            },
                            "&:hover fieldset": {
                                borderColor: error
                                    ? "#f87171 !important"
                                    : "#fff !important",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: error
                                    ? "#f87171 !important"
                                    : "#4ade80 !important",
                                borderWidth: "2px !important",
                            },

                            "& .MuiInputLabel-root": {
                                color: error ? "#f87171 !important" : "#ccc !important",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: error ? "#f87171 !important" : "#4ade80 !important",
                            },
                        },
                    },
                }}
            />
        </LocalizationProvider>
    );
}
