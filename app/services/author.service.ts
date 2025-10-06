export async function getAllAuthor() {
    const data = await fetch("/api/authors");

    const authour = await data.json();
    return authour;
}