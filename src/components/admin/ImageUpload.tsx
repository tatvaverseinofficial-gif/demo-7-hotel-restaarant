"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { useAdminMode } from "@/components/admin/AdminModeProvider";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export function ImageUpload({ value, onChange, label = "Image", folder = "uploads" }: ImageUploadProps) {
  const { readOnly } = useAdminMode();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB");
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Upload failed");
        return;
      }

      onChange(result.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (readOnly) {
    return (
      <div>
        <label className="block text-sm text-charcoal/70 mb-1.5">{label}</label>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="w-full max-w-xs h-32 object-cover border border-warm-beige" />
        ) : (
          <p className="text-sm text-charcoal/40">No image</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm text-charcoal/70 mb-1.5">{label}</label>

      {value && (
        <div className="relative inline-block mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full max-w-xs h-32 object-cover border border-warm-beige" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-6 h-6 bg-charcoal text-luxury-white flex items-center justify-center"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] border border-champagne/40 text-champagne text-sm hover:bg-champagne/10 transition-colors disabled:opacity-50 touch-manipulation"
        >
          {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL"
        className="w-full mt-3 border border-warm-beige px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-champagne bg-luxury-white"
      />

      {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
    </div>
  );
}
