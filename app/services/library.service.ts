
import { decodeUser } from "~/utils/verifyToken.server";
import mongoose from "mongoose";
import { json } from "@remix-run/node";

export async function getLibraryByUser() {
  const res = await fetch('/api/library');

  const text = await res.text();
  try {
    return { status: res.status, data: JSON.parse(text) };
  } catch {
    console.error(" Không parse được JSON:", text);
    return { status: res.status, data: null };
  }
}

export async function getLibraryProgress(bookId: string) {
  const res = await fetch(`/api/library/${bookId}`);
  if (!res.ok) throw new Error(`Lỗi khi lấy tiến độ: ${res.status}`);
  return await res.json(); 
}


export async function createLibrary(userId: string, bookId: string) {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("bookId", bookId);

  const res = await fetch("/api/library", {
    method: "POST",
    body: formData,
  });

  const text = await res.text();
  try {
    return { status: res.status, data: JSON.parse(text) };
  } catch {
    console.error(" Không parse được JSON:", text);
    return { status: res.status, data: null };
  }
}


export async function updateLibraryProgress(bookId: string, progress: number) {

  const formData = new FormData();
  formData.append("bookId", bookId);
  formData.append("progress", progress.toString());

  const res = await fetch("/api/library/progress", {
    method: "PUT",
    body: formData,
  });

  const text = await res.text();
  try {
    return { status: res.status, data: JSON.parse(text) };
  } catch {
    console.error(" Không parse được JSON:", text);
    return { status: res.status, data: null };
  }
}

