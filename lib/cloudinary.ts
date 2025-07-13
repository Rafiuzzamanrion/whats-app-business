// src/lib/cloudinary.ts
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Configure once when the module loads
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Keep this server-side only
});

export type UploadResult = {
  url: string;
  public_id?: string;
  width?: number;
  height?: number;
  format?: string;
};

export async function uploadToCloudinary(
  file: File | Blob,
  uploadPreset: string = "ml_default",
): Promise<UploadResult> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          upload_preset: uploadPreset,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else if (!result) reject(new Error("Upload failed"));
          else resolve(result);
        },
      )
      .end(buffer);
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
  };
}
