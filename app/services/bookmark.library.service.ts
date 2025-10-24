export async function toggleBookmark(
  bookId: string, pageIndex: 
  number, isBookmarked: boolean
) {
  if (!bookId) throw new Error("Thiếu bookId");

  const formData = new FormData();
  formData.append("bookId", bookId);
  formData.append("pageIndex", pageIndex.toString());
  formData.append("actionType", isBookmarked ? "removeBookmark" : "addBookmark");

  const res = await fetch("/api/library", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || data?.status !== 200) {
    throw new Error(data?.message || "Lỗi khi cập nhật bookmark");
  }

  return data;
}