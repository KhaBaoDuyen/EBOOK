import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface CustomDatePickerProps {
    label?: string;
    value?: any;
    onChange?: (value: any) => void;
}

export default function CustomDatePicker({
    label = "Chọn ngày",
    value,
    onChange,
}: CustomDatePickerProps) {
    function getToday() {
        return dayjs();
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                defaultValue={getToday()}
                label={label}
                value={value}
                onChange={onChange}
                sx={{
                    width: '100%',
                    "& .MuiInputBase-root": {
                        color: "white",
                        backgroundColor: "#1F2937",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#aaa !important",
                        borderWidth: "1px !important",
                        borderStyle: "solid !important",
                    },
                    "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff !important",
                    },
                    "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#4ade80 !important",
                        borderWidth: "2px !important",
                    },
                    "& .MuiInputLabel-root": {
                        color: "#ccc !important",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#4ade80 !important",
                    },
                    "& .MuiSvgIcon-root": {
                        color: "#fff !important",
                    },
                    "& .MuiFormControl-root": {
                        border: "none !important",
                    },
                    "& .MuiInputBase-input, & .MuiOutlinedInput-input, & .MuiPickersInputBase-input": {
                        color: "#fff !important",      
                        caretColor: "#4ade80",       
                    },
                    "& input::placeholder": {
                        color: "#fff !important",     
                        opacity: 0.8,
                    },

                }}
                slotProps={{
                    textField: {
                        variant: "outlined",
                        sx: {
                            "& .MuiInputBase-input, & .MuiOutlinedInput-input, & .MuiPickersInputBase-input": {
                                color: "#fff !important",      
                                caretColor: "#4ade80",       
                            },
                            "& input::placeholder": {
                                color: "#fff !important",     
                                opacity: 0.8,
                            },

                            "& .MuiInputBase-input": {
                                color: "#fff !important",
                            },

                            "& input": {
                                color: "white !important",
                            },
                            "& svg": {
                                color: "white !important",
                            },
                            "& fieldset": {
                                borderColor: "#aaa !important",
                                borderWidth: "1px !important",
                                borderStyle: "solid !important",
                            },
                            "&:hover fieldset": {
                                borderColor: "#fff !important",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#4ade80 !important",
                                borderWidth: "2px !important",
                            },
                            "& .MuiInputLabel-root": {
                                color: "#ccc !important",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#4ade80 !important",
                            },
                        },
                    },
                }}
            />
        </LocalizationProvider>
    );
}
