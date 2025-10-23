export async function getStatistical() {
    const res = await fetch("/api/thong-ke/user");

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Thong-Ke loi => ${res.status} , ${text}`);
    }
    const data = await res.json();
    return data;
}