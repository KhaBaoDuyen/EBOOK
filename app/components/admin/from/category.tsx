import { useEffect, useState } from "react";
import { Box, FormControlLabel, Checkbox } from "@mui/material";
import type { ICategory } from "~/interfaces/category.interface";

import CustomTextField from "../../text/CustomTextField";
import { getAllCategory } from "~/services/category.service";
import { toSlug } from "~/utils/toSlug";
import { validateCategogyForm } from "~/utils/validation/categogy.validation";
import { getCategoryBySlug } from "~/services/category.service";

import { useNotify } from "~/context/NotifyContext";

interface CatFormProps {
    initialData?: Partial<ICategory>;
    slugParam?: string;
    onSubmit: (data: FormData) => void;
}

export default function CategogyForm({
    initialData,
    onSubmit,
    slugParam,
}: CatFormProps) {
    const { setNotify } = useNotify();
    const [name, setName] = useState(initialData?.name || "");
    const [slug, setSlug] = useState("");
    const [status, setStatus] = useState<number>(initialData?.status ?? 1);
    const [categories, setCategories] = useState<any[]>([]);
    const [checked, setChecked] = useState<{ [key: string]: boolean }>({});
    const [showCategoryError, setShowCategoryError] = useState(false);


    const [touched, setTouched] = useState({
        name: false,
    });


    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await getAllCategory();
            const all = res.data;
            const parentCategories = all.filter((c: any) => !c.parentId);
            setCategories(parentCategories);
        } catch (err) {
            console.log("Lỗi khi lấy danh mục:", err);
        }
    };

    function handleToSlugs(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setName(value);
        setSlug(toSlug(value));
    }


    const handleCheck = (id: string) => {
        const selectedCount = Object.values(checked).filter(Boolean).length;

        if (!checked[id] && selectedCount >= 3) {
            setNotify({
                open: true,
                type: "error",
                title: "Chỉ được chọn tối đa 3 danh mục!",
                message: "Vui lòng bỏ chọn một danh mục trước khi chọn thêm.",
            });
            return;
        }

        setChecked((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    //-------------------[ LẤY DỮ LIỆU CATEGORIES ]-------------------

    const getBookBySlug = async (slugCat: string) => {
        try {
            const res = await getCategoryBySlug(slugCat);
            console.log("res", res);
            if (res.status === 200) {
                const catData = res.data;
                setName(catData.name || "");
                setSlug(catData.slug || "");
                setStatus(Number(catData.status) ?? 1);
                if (Array.isArray(catData.parentId)) {
                    const checkedMap: { [key: string]: boolean } = {};
                    catData.parentId.forEach((p: any) => {
                        const id = typeof p === "object" ? p._id : p;
                        checkedMap[id] = true;
                    });
                    setChecked(checkedMap);
                }
            } else {
                setNotify({
                    open: true,
                    type: "error",
                    title: "Lỗi khi lấy thể loại!",
                    message: "Vui lòng thử lại sau.",
                });
            }
        } catch (err) {
            console.log("Lỗi khi lấy thể loại:", err);
            setNotify({
                open: true,
                type: "error",
                title: "Lỗi khi lấy thể loại!",
                message: "Vui lòng thử lại sau.",
            });
        }
    };

    useEffect(() => {
        if (slugParam) {
            getBookBySlug(slugParam);
        }
    }, [slugParam]);

    //-------------------[ FORM SUBMIT ]-------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const selectedCategories = Object.keys(checked).filter((key) => checked[key]);

        setTouched({ name: true });
        setShowCategoryError(selectedCategories.length === 0);

        const isValid = validateCategogyForm({
            name,
        });

        if (!isValid) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("slug", slug || toSlug(name));
        formData.append("status", String(status));

        // Gắn mảng parentId vào formData
        selectedCategories.forEach((id) => {
            formData.append("parentId[]", id);
        });
        const success = await onSubmit(formData);

        if (success) {
            setName("");
            setSlug("");
            setStatus(1);
            setChecked({});
            setTouched({ name: false });
            setShowCategoryError(false);
            await fetchCategories();
        }
        console.log("formData", formData);

    };

    return (
        <form onSubmit={handleSubmit} className="text-white p-6 rounded-md">
            <div className="flex gap-5">
                <div className="p-5 border border-gray-500 rounded-md w-full bg-[#1F2937] space-y-6 h-auto">
                    <CustomTextField
                        value={name}
                        label="Tên loại"
                        onChange={handleToSlugs}
                        onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                        error={touched.name && !name.trim()}
                        helperText={
                            touched.name && !name.trim()
                                ? "Tên thể loại không được để trống"
                                : ""
                        }
                    />
                    <h1>Đường dẫn: {slug || "ten-url-the-loai"}</h1>

                    <div>
                        <h1 className="mb-2">Danh mục (chọn tối đa 3)</h1>
                        <Box className="max-w-max max-h-[200px] overflow-y-auto scroll-smooth flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <Box
                                    key={cat._id}
                                    className="p-2 rounded-md bg-[#111827] border border-gray-700 flex items-center justify-between"
                                >
                                    <FormControlLabel
                                        label={<span className="text-white">{cat.name}</span>}
                                        control={
                                            <Checkbox
                                                checked={!!checked[cat._id]}
                                                onChange={() => handleCheck(cat._id)}
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

                    <div>
                        <label className="block mb-1">Trạng thái</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(Number(e.target.value))}
                            className="w-full p-2 rounded-md border border-gray-400 bg-[#111827] text-white focus:border-blue-400 focus:ring focus:ring-blue-500/30 outline-none"
                        >
                            <option value={1}>Hiển thị</option>
                            <option value={0}>Ẩn</option>
                        </select>
                    </div>

                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            className="px-6 w-full py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition"
                        >
                            Lưu Thể Loại
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
