import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CustomTextField from "../../text/CustomTextField";
import { toSlug } from "~/utils/toSlug";

interface AuthorFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData) => void;
}

export default function AuthorForm({ open, onClose, onSubmit }: AuthorFormProps) {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [bio, setBio] = useState("");
    const [nationality, setNationality] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [touched, setTouched] = useState({ name: false });

    useEffect(() => {
        if (name) setSlug(toSlug(name));
    }, [name]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setTouched({ name: true });

        if (!name.trim()) return;

        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("slug", slug);
        formData.append("bio", bio.trim() || "Đang cập nhật");
        formData.append("nationality", nationality.trim() || "Đang cập nhật");
        formData.append("birthDate", birthDate || "Đang cập nhật");
        if (avatar) formData.append("avatar", avatar);

        onSubmit(formData);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setAvatar(file);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm" fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: "#1F2937",
                    color: "#fff",
                },
            }}>
            <DialogTitle className="font-semibold text-lg">Thêm tác giả mới</DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent className="space-y-4">
                    <CustomTextField
                        label="Tên tác giả"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched({ name: true })}
                        error={touched.name && !name.trim()}
                        helperText={
                            touched.name && !name.trim() ? "Tên tác giả không được để trống" : ""
                        }
                    />

                    <p className="text-sm text-gray-300">Slug: {slug || "ten-tac-gia"}</p>

                    <CustomTextField
                        label="Tiểu sử"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Nhập tiểu sử hoặc để trống"
                    />

                    <CustomTextField
                        label="Quốc tịch"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        placeholder="Nhập quốc tịch hoặc để trống"
                    />

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">
                            Ngày sinh
                        </label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-400 bg-[#111827] text-white outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">
                            Ảnh đại diện
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        />
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="inherit">
                        Hủy
                    </Button>
                    <Button type="submit" color="primary" variant="contained">
                        Lưu
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
