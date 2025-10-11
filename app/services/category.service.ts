export async function getAllCategory() {
  const res = await fetch("/api/categories");
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} - ${text}`);
  }

  const data = await res.json();
  console.log("Dữ liệu danh mục =>", data);
  return data;
}

export async function getCategoryBySlug(slugCat: string) {
  const res = await fetch(`/api/categogy/${slugCat}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} - ${text}`);
  }
  const data = await res.json();
  console.log("Dữ liệu danh mục theo slug =>", data);
  return data;
}