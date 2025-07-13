"use client";
import { useState } from "react";

import { uploadToCloudinary, UploadResult } from "@/lib/cloudinary";

export function useCloudinaryUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);

  const upload = async (file: File, preset?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const uploadResult = await uploadToCloudinary(file, preset);

      setResult(uploadResult);

      return uploadResult;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { upload, isLoading, error, result };
}
