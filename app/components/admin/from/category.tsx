import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Stack,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CloudUpload } from "@mui/icons-material";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import type { ICategory } from "~/interfaces/category.interface";

import CustomTextField from "../../text/CustomTextField";
import CustomDatePicker from "~/components/text/DatePicker";

import { getAllCategory } from "~/services/category.service";

import { toSlug } from "~/utils/toSlug";


interface CatFormProps {
    initialData?: Partial<ICategory>;
    onSubmit: (data: ICategory) => void;
}

export default function CategogyForm({ initialData, onSubmit }: CatFormProps) {
    const [name, setName] = useState(initialData?.name || "");
    const [slug, setSlug] = useState("");
    const [parentId, setParentID] = useState(initialData?.parentId || "");
    const [status, setStatus] = useState<number>(initialData?.status ?? 1);
    const [categories, setCategories] = useState<any[]>([]);


    //------[ HAM SU LY LAY DU LIEU DANH MUC ]------------
    const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        category();
    }, [])

    const category = async () => {
        try {
            const category = await getAllCategory();
            const categoriesAll = category.data;

            const parentCategories = categoriesAll.filter((c: any) => !c.parentId);

            setCategories(parentCategories);
            console.log("Danh muc =>", parentCategories);
        } catch (err) {
            console.log("Loi lay danh muc", err);
        }
    }


    //---------------[ DUONG DAN SLUG ]--------------
    function handleToSlugs(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setName(value);
        setSlug(toSlug(value));
    }

    return (
        <div className="text-white p-6 rounded-md">
            <div className="flex gap-5">
                <div className="  p-5 border border-gray-500 rounded-md w-full bg-[#1F2937] space-y-6 h-auto">
                    <div className="grid grid-cols-1 gap-4">
                        <CustomTextField value={name}
                            label="Tên loại"
                            onChange={handleToSlugs}
                            required />


                    </div>
                    <div className="grid grid-cols-1 gap-4">

                        <CustomTextField value={slug || "Duong-dan-sach"}
                            label="Dường dẫn"
                            onChange={handleToSlugs}
                            required />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <h1>Danh mục</h1>
                        <Box
                            className="max-w-max max-h-[200px] overflow-y-auto scroll-smooth flex flex-wrap gap-2"
                        >
                            {categories.map((cat) => (
                                <Box
                                    key={cat._id}
                                    className="p-2 rounded-md bg-[#111827] border border-gray-700 flex items-center justify-between" >
                                    <FormControlLabel
                                        label={<span className="text-white">{cat.name}</span>}
                                        control={
                                            <Checkbox
                                                checked={!!checked[cat._id]}
                                                onChange={() =>
                                                    setChecked((prev) => ({
                                                        ...prev,
                                                        [cat._id]: !prev[cat._id],
                                                    }))
                                                }
                                                sx={{
                                                    color: "#ccc",
                                                    "&.Mui-checked": { color: "#4ade80" },
                                                }}
                                            />
                                        }
                                    />
                                </Box>
                            ))}
                        </Box>



                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-1 ">Trạng thái</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(Number(e.target.value))}
                                className="w-full p-2 rounded-md border border-gray-400 bg-[#111827] text-white focus:border-blue-400 focus:ring focus:ring-blue-500/30 outline-none"
                            >
                                <option value={1}>Hiển thị</option>
                                <option value={0}>Ẩn</option>
                            </select>
                        </div>
                    </div>



                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            className="px-6 w-full py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition">
                            Lưu Thể Loại
                        </button>
                    </div>
                </div>


            </div>
        </div>

    );
}
