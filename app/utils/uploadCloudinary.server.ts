import cloudinary from "./cloudinary.server";
import streamifier from "streamifier";

export async function uploadToCloudinary(buffer: Buffer, folder: string, options: any = {}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto", ...options },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}