export async function getAllBook() {
  const res = await fetch("/api/books");
  console.log("dulieu book=>", res);
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} - ${text}`);
  }
  return await res.json();
}
