import type IUser from "~/interfaces/user.interface";

export async function getAllUsers() {
  const res = await fetch("/api/users");
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} - ${text}`);
  }
  return await res.json();
}
