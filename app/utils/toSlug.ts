export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")                 // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "")  // xóa dấu
    .replace(/[^a-z0-9\s-]/g, "")     // xóa ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-");            // thay khoảng trắng bằng dấu gạch ngang
}
