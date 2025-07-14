// hooks/useCloudinaryUpload.ts
"use client";
import { useState } from "react";

import { uploadToCloudinary } from "@/lib/cloudinary";

export function useCloudinaryUpload(defaultPreset: string = "upload_preset") {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    url: string;
    public_id?: string;
  } | null>(null);

  const upload = async (file: File, preset?: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const uploadResult = await uploadToCloudinary(
        file,
        preset || defaultPreset,
      );

      setResult(uploadResult);

      return uploadResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    upload,
    isLoading,
    error,
    result,
    reset: () => {
      setError(null);
      setResult(null);
    },
  };
}
