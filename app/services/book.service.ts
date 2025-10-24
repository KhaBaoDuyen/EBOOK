export async function getAllBook() {
  const res = await fetch("/api/books");
  console.log("dulieu book=>", res);
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} - ${text}`);
  }
  return await res.json();
}

export async function getBookBySlug(slugBook: string) {
  const res = await fetch(`/api/book/${slugBook}`);
  return await res.json();
}

export async function getAllIsBook() {
  const res = await fetch("/api/isBooks");
  // console.log("dulieu isBooks=>", res);
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} - ${text}`);
  }
  return await res.json();
}