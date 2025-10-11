import { toast } from "react-hot-toast";

export interface BookValidationInput {
  title?: string;
  publisher?: string;
  description?: string;
  selectedAuthor?: any;
  releaseDate?: Date | null;
  selectedCategories: string[];
  cover?: File | null | string;   
  fileBook?: File | null | string;  
  isUpdate?: boolean;

}

 const VALID_TITLE_REGEX = /^[a-zA-ZÀ-ỹ0-9\s.,()'"“”‘’:;?!_-]+$/;

export function validateBookForm({
  title,
  publisher,
  description,
  selectedAuthor,
  releaseDate,
  selectedCategories,
  cover,
  fileBook,
  isUpdate = false,
}: BookValidationInput): boolean {
  // ====== TÊN SÁCH ======
  if (!title || !title.trim()) {
    toast.error("Tên sách không được để trống");
    return false;
  }

  if (title.length > 300) {
    toast.error("Tên sách không được vượt quá 300 ký tự");
    return false;
  }

  if (!VALID_TITLE_REGEX.test(title)) {
    toast.error("Tên sách chứa ký tự không hợp lệ");
    return false;
  }


  // ====== NHÀ XUẤT BẢN ======
  // if (!publisher || !publisher.trim()) {
  //   toast.error("Nhà xuất bản không được để trống");
  //   return false;
  // }

  // ====== MÔ TẢ ======
  if (!description || !description.trim()) {
    toast.error("Mô tả không được để trống");
    return false;
  }

  // ====== TÁC GIẢ ======
  if (!selectedAuthor) {
    toast.error("Vui lòng chọn tác giả!");
    return false;
  }

  // ====== NGÀY PHÁT HÀNH ======
  // if (!releaseDate) {
  //   toast.error("Vui lòng chọn ngày phát hành!");
  //   return false;
  // }

  // ====== DANH MỤC ======
  if (selectedCategories.length === 0) {
    toast.error("Vui lòng chọn ít nhất một danh mục!");
    return false;
  }

  // ====== ẢNH & FILE ======
  if (!cover) {
    toast.error("Vui lòng chọn ảnh bìa sách!");
    return false;
  }

  if (!fileBook) {
    toast.error("Vui lòng tải file sách!");
    return false;
  }

  return true;
}
