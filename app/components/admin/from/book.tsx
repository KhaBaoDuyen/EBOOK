import React, { useEffect, useState } from "react";
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


import type { IBook } from "~/interfaces/book.interface";

import CustomTextField from "../../text/CustomTextField";
import CustomDatePicker from "~/components/text/DatePicker";
import CustomComboBox from "../../text/BoxGroup";

import { getAllCategory } from "~/services/category.service";
import { getAllAuthor } from "~/services/author.service"

import { toSlug } from "~/utils/toSlug";
import { log } from "console";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";


interface BookFormProps {
  initialData?: Partial<IBook>;
  onSubmit: (formData: FormData) => void;
}

export default function BookForm({ initialData, onSubmit }: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState("");
  const [authors, setAuthors] = React.useState<any[]>([]);
  const [selectedAuthor, setSelectedAuthor] = React.useState<any>(null);
  const [publisher, setPublisher] = useState(initialData?.publisher || "");
  const [releaseDate, setReleaseDate] = useState<Date | null>(
    initialData?.releaseDate || null
  );
  const [categories, setCategories] = useState<string[]>(
    initialData?.categories || []
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState<number>(initialData?.status ?? 1);
  const [cover, setCover] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileBook, setFileBook] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();

  useEffect(() => {
    category();
    getAuthors();
  }, [])

  //------[ HAM SU LY LAY DU LIEU DANH MUC ]------------
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});


  const category = async () => {
    try {
      const category = await getAllCategory();
      const categoriesAll = category.data;

      const parentCategories = categoriesAll.filter((c: any) => !c.parentId);
      const childcategories = categoriesAll.filter((c: any) => c.parentId);

      const group = parentCategories.map((parent: any) => ({
        ...parent,
        children: childcategories.filter(
          (child: any) => child.parentId === parent._id
        ),
      }))

      setCategories(group);
      console.log("Danh muc con", group);
    } catch (err) {
      console.log("Loi lay danh muc", err);
    }
  }

  const handleParentChange = (parentId: string, children: any[]) => {
    const allChecked = !checked[parentId];
    const updated: any = { ...checked, [parentId]: allChecked };
    children.forEach((child) => {
      updated[child._id] = allChecked;
    });
    setChecked(updated);
  };

  const handleChildChange = (childId: string) => {
    setChecked((prev) => ({
      ...prev,
      [childId]: !prev[childId],
    }));
  };

  //---------------[ DUONG DAN SLUG ]--------------
  function handleToSlugs(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);
    setSlug(toSlug(value));
  }

  //---------------[ HAM HIEN THI ANH COVER ]--------------
  function handleCover(e: React.ChangeEvent<HTMLInputElement>) {
    const image = e.target.files?.[0];
    if (image) {
      setCover(image);
      setPreview(URL.createObjectURL(image));
    }
  }
  //---------------[ HAm LAY TAC GIA ]---------------------

  const getAuthors = async () => {
    try {
      const author = await getAllAuthor();
      setAuthors(author.data);
    } catch (err) {
      console.log("loi khi lay tac gia", err)
    }
  }

  //------------------[ THEM DU LIEU ]----------------
  const Submit: SubmitHandler<IBook> = (data) => {
    const selectedCategories = Object.keys(checked).filter((id) => checked[id]);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("publisher", publisher);
    formData.append("releaseDate", releaseDate ? releaseDate.toISOString() : "");
    formData.append("authorId", selectedAuthor?._id || "");
    formData.append("status", status.toString());
    formData.append("categories", JSON.stringify(selectedCategories));
    if (cover) formData.append("cover", cover);
    if (fileBook) formData.append("filePath", fileBook);

    onSubmit(formData);
  };

  return (
    <div className="text-white p-6 rounded-md">
      <form className="flex gap-5"
        onSubmit={handleSubmit(Submit)}
        encType="multipart/form-data">
        <div className="basis-[70%] p-5 border border-gray-500 rounded-md w-full bg-[#1F2937] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <CustomTextField value={title}
                label="Tên sách"
                onChange={handleToSlugs}
              />
              <p className="pt-2">Đường dẫn: {slug || "Duong-dan-sach"}</p>
            </div>
            <div>

              <CustomComboBox
                label="Chọn tác giả"
                options={authors}
                value={selectedAuthor}
                getOptionLabel={(a: any) => a.name}
                onChange={(value) => setSelectedAuthor(value)}

              />


            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <CustomTextField
                value={publisher}
                label="Nhà xuất bản"
                onChange={(e) => setPublisher(e.target.value)}
                required />
            </div>
            <div>
              <CustomDatePicker
                label="Ngày phát hành"
                value={releaseDate}
                onChange={(newValue) => setReleaseDate(newValue)}
              />
            </div>
          </div>
          <div>
            <CustomTextField
              value={description}
              label="Mô tả"
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <h1>Danh mục</h1>
            <Box>
              {categories.map((parent) => {
                const children = parent.children || [];
                const allChildrenChecked = children.every((c: any) => checked[c._id]);
                const someChildrenChecked =
                  children.some((c: any) => checked[c._id]) && !allChildrenChecked;

                return (
                  <Box
                    key={parent._id}
                    className="mb-4 p-3 rounded-md bg-[#1F2937] shadow-md border border-gray-700"
                  >
                    <FormControlLabel
                      label={<span className="font-semibold text-white">{parent.name}</span>}
                      control={
                        <Checkbox
                          checked={
                            children.length === 0
                              ? !!checked[parent._id]
                              : allChildrenChecked
                          }
                          indeterminate={children.length > 0 && someChildrenChecked}
                          onChange={() => {
                            if (children.length === 0) {
                              setChecked((prev) => ({
                                ...prev,
                                [parent._id]: !prev[parent._id],
                              }));
                            } else {
                              handleParentChange(parent._id, children);
                            }
                          }}
                          sx={{
                            color: "#ccc",
                            "&.Mui-checked": { color: "#4ade80" },
                          }}
                        />
                      }
                    />

                    {children.length > 0 && (
                      <FormGroup
                        className="pl-8 grid md:grid-cols-3 grid-cols-2 gap-1 mt-2 overflow-y-auto"
                        sx={{
                          maxHeight: "100px",
                          scrollbarWidth: "thin",
                          "&::-webkit-scrollbar": { width: "6px" },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#4ade80",
                            borderRadius: "10px",
                          },
                        }}
                      >
                        {children.map((child: any) => (
                          <FormControlLabel
                            key={child._id}
                            label={<span className="text-sm text-gray-200">{child.name}</span>}
                            control={
                              <Checkbox
                                checked={!!checked[child._id]}
                                onChange={() => handleChildChange(child._id)}
                                sx={{
                                  color: "#ccc",
                                  "&.Mui-checked": { color: "#4ade80" },
                                }}
                              />
                            }
                          />
                        ))}
                      </FormGroup>
                    )}
                  </Box>
                );
              })}
            </Box>
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
              Lưu Sách
            </button>
          </div>
        </div>

        <aside className="basis-[30%] p-5 bg-[#1F2937] border border-gray-500 shadow-gray-700 flex rounded-md flex-col justify-start items-center space-y-6">
          <div className="w-full flex flex-col gap-3 text-center">
            <label className="block mb-2 text-sm font-medium">Ảnh bìa sách</label>
            <img src={preview || "/Images/Slides/mobile/4276.png"} alt=""
              className="w-[100%] h-auto hover:border-white border-1 rounded-md" />
            <input
              type="file"
              accept="image/*"
              onChange={handleCover}
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            {cover && (
              <p className="mt-2 text-gray-300 text-sm truncate">{cover.name}</p>
            )}
          </div>

          <div className="w-full text-center">
            <label className="block mb-2 text-sm font-medium">Tải file sách</label>
            <input
              type="file"
              accept=".pdf,.epub"
              onChange={(e) => setFileBook(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            {fileBook && (
              <p className="mt-2 text-gray-300 text-sm truncate">{fileBook.name}</p>
            )}
          </div>
        </aside>
      </form>
    </div>

  );
}
