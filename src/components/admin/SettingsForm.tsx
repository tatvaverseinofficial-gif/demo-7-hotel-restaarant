"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminMode } from "@/components/admin/AdminModeProvider";

const inputClass = "w-full border border-warm-beige px-4 py-3 text-base text-charcoal focus:outline-none focus:border-champagne bg-luxury-white min-h-[48px]";
const labelClass = "block text-sm text-charcoal/70 mb-1.5";

export function SettingsForm<T extends object>({
  title,
  settings,
  fields,
  apiType,
}: {
  title: string;
  settings: T;
  fields: { key: keyof T; label: string; type?: string; rows?: number }[];
  apiType: string;
}) {
  const router = useRouter();
  const { readOnly } = useAdminMode();
  const [form, setForm] = useState(settings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly) return;
    setIsSubmitting(true);
    try {
      await fetch(`/api/admin/settings?type=${apiType}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setMessage("Settings saved successfully!");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif text-charcoal mb-6 sm:mb-8">{title}</h1>
      {message && <p className="mb-4 text-forest text-sm">{message}</p>}
      <form onSubmit={handleSubmit} className="bg-luxury-white p-4 sm:p-6 shadow-luxury space-y-4 sm:space-y-5 max-w-2xl">
        {fields.map((field) => (
          <div key={String(field.key)}>
            <label className={labelClass}>{field.label}</label>
            {field.rows ? (
              <textarea
                className={inputClass}
                rows={field.rows}
                value={String(form[field.key] ?? "")}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                readOnly={readOnly}
                disabled={readOnly}
              />
            ) : (
              <input
                className={inputClass}
                type={field.type || "text"}
                value={String(form[field.key] ?? "")}
                onChange={(e) => setForm({ ...form, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value })}
                readOnly={readOnly}
                disabled={readOnly}
              />
            )}
          </div>
        ))}
        {!readOnly && (
          <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-6 py-3.5 min-h-[48px] bg-champagne text-charcoal text-sm uppercase disabled:opacity-50 touch-manipulation">
            {isSubmitting ? "Saving..." : "Save Settings"}
          </button>
        )}
      </form>
    </div>
  );
}
