export function toSlug(str: string): string {
  if (!str) return "";

  return str
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a")
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e")
    .replace(/í|ì|ỉ|ĩ|ị/g, "i")
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o")
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u")
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y")
    .normalize("NFD")                 // tách dấu còn sót
    .replace(/[\u0300-\u036f]/g, "")  // xóa dấu tổ hợp
    .replace(/[^a-z0-9\s-]/g, "")     // loại bỏ ký tự đặc biệt khác
    .trim()
    .replace(/\s+/g, "-")             // thay khoảng trắng bằng "-"
    .replace(/-+/g, "-")              // bỏ bớt dấu gạch liên tiếp
    .replace(/^-+|-+$/g, "");         // xóa gạch đầu & cuối chuỗi
}
