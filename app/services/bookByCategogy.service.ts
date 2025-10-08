import { METHODS } from "http";

export async function bookByGroupsThienDinh() {
    try {
        const res = await fetch("/api/user/bookByGroup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                slugs: ["hien-dai", "co-dai"],
            }),
        });


        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Error : ${res.status} - ${text}`);
        }
        return await res.json();
    } catch (err: any) {
        console.log("loi", err.message);

    }
}
export async function bookByGroupsKyNang() {
    try {
        const res = await fetch("/api/user/bookByGroup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                slugs: ["ky-nang-song", "tam-ly"],
            }),
        });


        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Error : ${res.status} - ${text}`);
        }
        return await res.json();
    } catch (err: any) {
        console.log("loi", err.message);

    }
}

export async function bookByGroupsTuTruyenHoiKy() {
    try {
        const res = await fetch("/api/user/bookByGroup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                slugs: ["tu-truyen", "hoi-ky"],
            }),
        });


        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Error : ${res.status} - ${text}`);
        }
        return await res.json();
    } catch (err: any) {
        console.log("loi", err.message);

    }
}

export async function bookByGroupsTrinhThamKinhDi() {
    try {
        const res = await fetch("/api/user/bookByGroup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                slugs: ["trinh-tham", "kinh-di"],
            }),
        });


        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Error : ${res.status} - ${text}`);
        }
        return await res.json();
    } catch (err: any) {
        console.log("loi", err.message);

    }
}

export async function bookByRandom() {
    try {
        const res = await fetch("/api/user/bookByGroup");
        return res.json();
    } catch (err: any) {
        console.log("loi khi lay sach random", err.message);

    }
}