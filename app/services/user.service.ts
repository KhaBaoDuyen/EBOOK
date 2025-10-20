import type IUser from "~/interfaces/user.interface";

export async function getAllUsers() {
  const res = await fetch("/api/users");
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} - ${text}`);
  }
  return await res.json();
}

export async function getAuthByEmail(email: string) {
  const res = await fetch(`/api/tai-khoan/${email}`);

  console.log("dulieu api", res);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API lay dulieu tai khoan theo email loi => ${res.status} , ${text}`);
  }
  const data = await res.json();
  return data;
}

export async function updateAuth(email: string, formData: FormData) {
  const res = await fetch(`/api/tai-khoan/${email}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API lỗi khi cập nhật (${res.status}): ${errorText}`);
  }

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    data = { message: await res.text() };
  }

  return { status: res.status, data };
}

export async function deleteAuth(email: string) {
  const res = await fetch(`/api/tai-khoan/${email}`, {
    method: "DELETE"
  })

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API loi khi xoa => ${res.status} - ${errorText}`);
  }

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    data = { message: await res.text() };
  }

  return { status: res.status, data };
}