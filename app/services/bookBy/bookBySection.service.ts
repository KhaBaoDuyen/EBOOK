export async function bookByCreateAt() {
    try {
        const res = await fetch("/api/user/bookByCreateAt");
        return await res.json();
    } catch (err: any) {
        console.log("Loi khi lay bookCreateAt=>", err.message);
    }
}