"use client";

import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  title: string;
  data: T[];
  columns: Column<T>[];
  addHref: string;
  onDelete: (id: string) => void;
  onToggleVisibility?: (id: string, visible: boolean) => void;
  editHref: (id: string) => string;
  readOnly?: boolean;
}

export function DataTable<T extends { id: string; visible?: boolean }>({
  title,
  data,
  columns,
  addHref,
  onDelete,
  onToggleVisibility,
  editHref,
  readOnly = false,
}: DataTableProps<T>) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-serif text-charcoal">{title}</h1>
        {!readOnly && (
          <Link
            href={addHref}
            className="flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-champagne text-charcoal text-sm hover:bg-soft-gold transition-colors touch-manipulation w-full sm:w-auto"
          >
            <Plus size={16} /> Add New
          </Link>
        )}
      </div>

      <div className="bg-luxury-white shadow-luxury overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-warm-beige/30">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="text-left px-4 py-3 font-medium text-charcoal/70">
                  {col.label}
                </th>
              ))}
              <th className="text-right px-4 py-3 font-medium text-charcoal/70">{readOnly ? "View" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t border-warm-beige/30 hover:bg-warm-beige/10">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-charcoal/80">
                    {col.render
                      ? col.render(item)
                      : String((item as Record<string, unknown>)[col.key as string] ?? "")}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {!readOnly && onToggleVisibility && "visible" in item && (
                      <button
                        onClick={() => onToggleVisibility(item.id, !item.visible)}
                        className="p-1.5 text-charcoal/50 hover:text-champagne"
                        title={item.visible ? "Hide" : "Show"}
                      >
                        {item.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    )}
                    <Link
                      href={editHref(item.id)}
                      className="p-1.5 text-charcoal/50 hover:text-champagne"
                      title={readOnly ? "View" : "Edit"}
                    >
                      <Pencil size={16} />
                    </Link>
                    {!readOnly && (
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this item?")) {
                            onDelete(item.id);
                          }
                        }}
                        className="p-1.5 text-charcoal/50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-charcoal/50">
                  No items found.{!readOnly && ' Click "Add New" to create one.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
