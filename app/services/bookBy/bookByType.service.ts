 export async function bookByType(type: "sach-moi-nhat" | "doc-nhieu-nhat" | "sach-duoc-yeu-thich-nhat" | "sach-duoc-danh-gia-cao-nhat") {
  try {
    const res = await fetch(`/api/isBooks?type=${type}`);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API lỗi: ${res.status} - ${text}`);
    }

    const data = await res.json();
    return data.data;  
  } catch (err: any) {
    console.error("  Lỗi khi lấy sách theo type:", err.message);
    return [];
  }
}
