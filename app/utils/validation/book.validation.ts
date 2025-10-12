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
  setNotify?: (params: any) => void;
}

const VALID_TITLE_REGEX = /^[a-zA-ZÀ-ỹ0-9\s.,()'"“”‘’:;?!_\-–—=]+$/;

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
  setNotify,
}: BookValidationInput): boolean {
  const notifyError = (message: string) => {
    setNotify?.({
      open: true,
      type: "error",
      title: "Lỗi khi thêm sách!",
      message,
    });
  };

  if (!title?.trim()) return notifyError("Tên sách không được để trống"), false;
  if (title.length > 300) return notifyError("Tên sách không được vượt quá 300 ký tự"), false;
  if (!VALID_TITLE_REGEX.test(title)) return notifyError("Tên sách chứa ký tự không hợp lệ"), false;
  if (!description?.trim()) return notifyError("Mô tả không được để trống"), false;
  if (!selectedAuthor) return notifyError("Vui lòng chọn tác giả cho sách"), false;
  if (selectedCategories.length === 0)
    return notifyError("Vui lòng chọn ít nhất một thể loại cho sách"), false;
  if (!cover) return notifyError("Vui lòng tải ảnh bìa sách!"), false;
  if (!fileBook) return notifyError("Vui lòng tải file sách!"), false;

  return true;
}
