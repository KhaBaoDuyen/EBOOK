import { useState } from "react";
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
import CustomTextField from "../../text/CustomTextField";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import type { IBook } from "~/interfaces/book.interface";


interface BookFormProps {
  initialData?: Partial<IBook>;
  onSubmit: (data: IBook) => void;
}

export default function BookForm({ initialData, onSubmit }: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
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
  const [fileBook, setFileBook] = useState<File | null>(null);

  const categoryOptions = [
    { _id: "1", name: "Tiểu thuyết" },
    { _id: "2", name: "Truyện ngắn" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: IBook = {
      title,
      author,
      publisher,
      releaseDate,
      categories,
      description,
      status,
      cover,
      fileBook,
    };
    onSubmit(data);
  };

  return (
    <div className="text-white p-6 rounded-md">
      <div className="flex gap-5">
        <div className="basis-[70%] p-5 border border-gray-500 rounded-md w-full bg-[#1F2937] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Tên sách</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 rounded-md border border-gray-400 bg-[#111827] text-white focus:border-blue-400 focus:ring focus:ring-blue-500/30 outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Tác giả</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full p-2 rounded-md border border-gray-400 bg-[#111827] text-white focus:border-blue-400 focus:ring focus:ring-blue-500/30 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Nhà xuất bản</label>
              <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-400 bg-[#111827] text-white focus:border-blue-400 focus:ring focus:ring-blue-500/30 outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Ngày phát hành</label>
              <input
                type="date"
                value={
                  releaseDate
                    ? new Date(releaseDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => setReleaseDate(new Date(e.target.value))}
                className="w-full p-2 rounded-md border border-gray-400 bg-[#111827] text-white focus:border-blue-400 focus:ring focus:ring-blue-500/30 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Danh mục</label>
              <select
                multiple
                value={categories}
                onChange={(e) =>
                  setCategories(
                    Array.from(e.target.selectedOptions, (option) => option.value)
                  )
                }
                className="w-full p-2 rounded-md border border-gray-400 bg-[#111827] text-white focus:border-blue-400 focus:ring focus:ring-blue-500/30 outline-none"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm">Trạng thái</label>
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

          <div>
            <label className="block mb-1 text-sm">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-2 rounded-md border border-gray-400 bg-[#111827] text-white focus:border-blue-400 focus:ring focus:ring-blue-500/30 outline-none resize-none"
            ></textarea>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
            >
              Lưu Sách
            </button>
          </div>
        </div>

        <aside className="basis-[30%] p-5 bg-[#1F2937] border border-gray-500 shadow-gray-700 flex rounded-md flex-col justify-center items-center space-y-6">
          <div className="w-full text-center">
            <label className="block mb-2 text-sm font-medium">Tải ảnh bìa</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCover(e.target.files?.[0] || null)}
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
      </div>
    </div>

  );
}
