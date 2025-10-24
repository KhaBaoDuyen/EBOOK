export async function getNotesByBook(bookId: string) {
  const res = await fetch(`/api/notes?bookId=${bookId}`);
  if (!res.ok) throw new Error("Không thể tải ghi chú");
  return res.json();
}

export async function createNote(data: {
  bookId: string;
  text: string;
  highlight: string;
  color?: string;
  pageIndex?: number;
}) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, val]) => formData.append(key, String(val)));

  const res = await fetch("/api/notes", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Không thể tạo ghi chú");
  return res.json();
}

export async function deleteNote(id: string) {
  const formData = new FormData();
  formData.append("id", id);
  const res = await fetch("/api/notes", {
    method: "DELETE",
    body: formData,
  });
  if (!res.ok) throw new Error("Không thể xoá ghi chú");
  return res.json();
}
