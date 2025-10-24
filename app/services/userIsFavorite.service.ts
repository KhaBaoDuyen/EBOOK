export async function IsFavorite(bookId: string) {
  const formData = new FormData();
  formData.append("bookId", bookId);

  const res = await fetch("/api/library/isFavorite", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Lỗi khi lấy yêu thích");
  return data;
}

export async function updateIsFavorite(bookId: string, isFavorite: boolean) {
  const formData = new FormData();
  formData.append("bookId", bookId);
  formData.append("isFavorite", String(isFavorite));

  const res = await fetch("/api/library/create-isFavorite", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Lỗi khi cập nhật yêu thích");
  return data;
}

