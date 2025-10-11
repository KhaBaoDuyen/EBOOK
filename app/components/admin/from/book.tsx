
import React, { useEffect, useState } from "react";
import { Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import type { IBook } from "~/interfaces/book.interface";

//-----------------[ COMPONENT ]--------------------------
import CustomTextField from "../../text/CustomTextField";
import CustomDatePicker from "~/components/text/DatePicker";
import CustomComboBox from "../../text/BoxGroup";
import RichTextEditor from "../../text/RichTextEditor";

//-----------------[ SERVICE - UTILS ]--------------------------
import { getAllCategory } from "~/services/category.service";
import { getAllAuthor } from "~/services/author.service";
import { toSlug } from "~/utils/toSlug";
import { validateBookForm, type BookValidationInput } from "~/utils/validation/book.validation";

export default function BookForm({ initialData, onSubmit }: { initialData?: Partial<IBook>, onSubmit: (formData: FormData) => void }) {
  const [slug, setSlug] = useState("");
  const [authors, setAuthors] = useState<any[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});
  const [cover, setCover] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileBook, setFileBook] = useState<File | null>(null);
  const [status, setStatus] = useState<number>(initialData?.status ?? 1);
  const [releaseDate, setReleaseDate] = useState<Date | null>(
    initialData?.releaseDate || null
  );
  const [dataTitle, setDataTitle] = useState(initialData?.title || "");
  const [publisher, setPublisher] = useState(initialData?.publisher || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [showCategoryError, setShowCategoryError] = useState(false);

  const [touched, setTouched] = useState({
    title: false,
    publisher: false,
    description: false,
    releaseDate: false,
    author: false,
  });

  // ==== Slug tự động ====
  useEffect(() => {
    if (dataTitle) setSlug(toSlug(dataTitle));
  }, [dataTitle]);

  // ==== Lấy dữ liệu ====
  useEffect(() => {
    getAllCategory().then((res) => {
      const categoriesAll = res.data;
      const parentCategories = categoriesAll.filter((c: any) => !c.parentId);
      const childcategories = categoriesAll.filter((c: any) => c.parentId);
      const group = parentCategories.map((p: any) => ({
        ...p,
        children: childcategories.filter((c: any) => c.parentId === p._id),
      }));
      setCategories(group);
    });
    getAllAuthor().then((res) => setAuthors(res.data));
  }, []);

  // ==== Checkbox ====
  const handleParentChange = (parentId: string, children: any[]) => {
    const allChecked = !checked[parentId];
    const updated: any = { ...checked, [parentId]: allChecked };
    children.forEach((child) => (updated[child._id] = allChecked));
    setChecked(updated);
  };

  const handleChildChange = (childId: string) => {
    setChecked((prev) => ({ ...prev, [childId]: !prev[childId] }));
  };

  // ==== Ảnh bìa ====
  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      setCover(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  // ==== Submit ====
  const Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCategories = Object.keys(checked).filter((id) => checked[id]);
    setTouched({
      title: true,
      publisher: true,
      description: true,
      releaseDate: true,
      author: true,
    });
    setShowCategoryError(selectedCategories.length === 0);

    const isValid = validateBookForm({
      title: dataTitle,
      publisher,
      description,
      selectedAuthor,
      releaseDate,
      selectedCategories,
      cover,
      fileBook,
    });
    if (!isValid) return;

    const formData = new FormData();
    formData.append("title", dataTitle);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("publisher", publisher);
    formData.append("releaseDate", releaseDate!.toISOString());
    formData.append("authorId", selectedAuthor?._id || "");
    formData.append("status", status.toString());
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("cover", cover!);
    formData.append("filePath", fileBook!);

    onSubmit(formData);
  };

  return (
    <div className="text-white p-6 rounded-md">
      <form className="flex gap-5" onSubmit={Submit}>
        <div className="basis-[70%] p-5 border border-gray-500 rounded-md bg-[#1F2937] space-y-6">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <CustomTextField
                label="Tên sách"
                value={dataTitle}
                onChange={(e) => setDataTitle(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, title: true }))}
                error={touched.title && !dataTitle.trim()}
                helperText={
                  touched.title && !dataTitle.trim()
                    ? "Tên sách không được để trống"
                    : ""
                }
              />
              <p className="pt-2">Đường dẫn: {slug || "duong-dan-sach"}</p>
            </div>

            <div>
              <CustomComboBox
                label="Chọn tác giả"
                options={authors}
                value={selectedAuthor}
                getOptionLabel={(a: any) => a.name}
                onChange={(value) => setSelectedAuthor(value)}
                onBlur={() => setTouched((prev) => ({ ...prev, author: true }))}
                error={!selectedAuthor && touched.author}
                helperText={
                  !selectedAuthor && touched.author
                    ? "* Vui lòng chọn tác giả"
                    : ""
                }
              />

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <CustomTextField
                label="Nhà xuất bản"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, publisher: true }))}
                error={touched.publisher && !publisher.trim()}
                helperText={
                  touched.publisher && !publisher.trim()
                    ? "Nhà xuất bản không được để trống"
                    : ""
                }
              />
            </div>
            <div >
              <CustomDatePicker
                label="Ngày phát hành"
                value={releaseDate}
                onChange={(newValue) => setReleaseDate(newValue)}
                onBlur={() => setTouched((p) => ({ ...p, releaseDate: true }))}
                error={touched.releaseDate && !releaseDate}
                helperText={
                  touched.releaseDate && !releaseDate
                    ? "* Vui lòng chọn ngày phát hành"
                    : ""
                }
              />

            </div>
          </div>

          <div>
            <RichTextEditor
              label="Mô tả"
              value={description}
              onChange={(html) => setDescription(html)}
              error={touched.description && !description.trim()}
              helperText={
                touched.description && !description.trim()
                  ? "Mô tả không được để trống"
                  : ""
              }
            />

          </div>

          <div className={`border p-3 rounded-md transition-all duration-200 ${showCategoryError ? "border-red-500" : "border-gray-700" }`}>
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
            {showCategoryError && (
              <p className="text-red-400 text-sm mt-1">
                * Vui lòng chọn ít nhất một danh mục
              </p>
            )}
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
              Lưu Sách
            </button>
          </div>
        </div>

        <aside className="basis-[30%] p-5 bg-[#1F2937] border border-gray-500 shadow-gray-700 flex rounded-md flex-col justify-start items-center space-y-6">
          <div className="w-full flex flex-col gap-3 text-center">
            <label className="block mb-2 text-sm font-medium">Ảnh bìa sách</label>
            <img
              src={preview || "/Images/Slides/mobile/4276.png"}
              alt=""
              className={`w-[100%] h-auto rounded-md border ${!cover ? "border-red-500" : "border-transparent"
                }`}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleCover}
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            {!cover && (
              <p className="text-red-400 text-sm">* Vui lòng chọn ảnh bìa</p>
            )}
          </div>

          <div className="w-full text-center">
            <label className="block mb-2 text-sm font-medium">Tải file sách</label>
            <input
              type="file"
              accept=".pdf,.epub"
              onChange={(e) => setFileBook(e.target.files?.[0] || null)}
              className={`w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold ${!fileBook ? "file:bg-red-700" : "file:bg-blue-600"
                } file:text-white hover:file:bg-blue-700`}
            />
            {!fileBook && (
              <p className="text-red-400 text-sm">* Vui lòng tải file sách</p>
            )}
          </div>
        </aside>
      </form>
    </div>
  );
}
