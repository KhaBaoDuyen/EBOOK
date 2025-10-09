export async function bookByCatgories(slug?: string) {
    try {
        const url = `/api/user/render/${slug}`;
        const res = await fetch(url);
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Error : ${res.status} - ${text}`);
        }
        return await res.json();
    } catch (err: any) {
        console.log("loi", err.message);

    }
}