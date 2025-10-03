import type { User } from "~/types/user";

export async function getAllUsers() {
  const res = await fetch("/api/tai-khoan/tat-ca");
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} - ${text}`);
  }
  return await res.json();
}
