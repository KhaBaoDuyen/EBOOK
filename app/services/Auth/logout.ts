export async function Logout() {
    const res = await fetch("/api/auth/logout", { method: "POST" });

    if (!res.ok) {
        throw new Error("Không thể đăng xuất. Vui lòng thử lại.");
    }

    const data = await res.json();
    return {status: res.status, ...data};
}