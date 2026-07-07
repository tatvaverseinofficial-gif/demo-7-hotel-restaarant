"use client";

import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  /** Hide on mobile card view when space is tight */
  hideOnMobile?: boolean;
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

function ActionButtons<T extends { id: string; visible?: boolean }>({
  item,
  readOnly,
  onToggleVisibility,
  editHref,
  onDelete,
}: {
  item: T;
  readOnly: boolean;
  onToggleVisibility?: (id: string, visible: boolean) => void;
  editHref: (id: string) => string;
  onDelete: (id: string) => void;
}) {
  const actionClass =
    "inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 text-charcoal/50 hover:text-champagne transition-colors touch-manipulation";

  return (
    <div className="flex items-center justify-end gap-1 sm:gap-2">
      {!readOnly && onToggleVisibility && "visible" in item && (
        <button
          onClick={() => onToggleVisibility(item.id, !item.visible)}
          className={actionClass}
          title={item.visible ? "Hide" : "Show"}
          aria-label={item.visible ? "Hide item" : "Show item"}
        >
          {item.visible ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      )}
      <Link
        href={editHref(item.id)}
        className={actionClass}
        title={readOnly ? "View" : "Edit"}
        aria-label={readOnly ? "View item" : "Edit item"}
      >
        <Pencil size={18} />
      </Link>
      {!readOnly && (
        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete this item?")) {
              onDelete(item.id);
            }
          }}
          className={`${actionClass} hover:text-red-600`}
          aria-label="Delete item"
        >
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );
}

function cellValue<T>(item: T, col: Column<T>) {
  if (col.render) return col.render(item);
  return String((item as Record<string, unknown>)[col.key as string] ?? "");
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
  const mobileColumns = columns.filter((col) => !col.hideOnMobile);

  return (
    <div className="min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-serif text-charcoal break-words">{title}</h1>
        {!readOnly && (
          <Link
            href={addHref}
            className="flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-champagne text-charcoal text-sm hover:bg-soft-gold transition-colors touch-manipulation w-full sm:w-auto shrink-0"
          >
            <Plus size={16} /> Add New
          </Link>
        )}
      </div>

      {/* Mobile card layout */}
      <div className="md:hidden space-y-3">
        {data.map((item) => (
          <article
            key={item.id}
            className="bg-luxury-white shadow-luxury border border-warm-beige/30 p-4"
          >
            <div className="space-y-2">
              {mobileColumns.map((col) => (
                <div
                  key={String(col.key)}
                  className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-3 py-1 border-b border-warm-beige/20 last:border-0"
                >
                  <span className="text-[10px] uppercase tracking-wider text-charcoal/45 shrink-0">
                    {col.label}
                  </span>
                  <div className="text-sm text-charcoal/80 min-w-0 break-words">
                    {cellValue(item, col)}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-3 mt-2 border-t border-warm-beige/30">
              <ActionButtons
                item={item}
                readOnly={readOnly}
                onToggleVisibility={onToggleVisibility}
                editHref={editHref}
                onDelete={onDelete}
              />
            </div>
          </article>
        ))}
        {data.length === 0 && (
          <div className="bg-luxury-white shadow-luxury p-8 text-center text-charcoal/50 text-sm">
            No items found.{!readOnly && ' Tap "Add New" to create one.'}
          </div>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-luxury-white shadow-luxury overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-warm-beige/30">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="text-left px-4 py-3 font-medium text-charcoal/70 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
              <th className="text-right px-4 py-3 font-medium text-charcoal/70 whitespace-nowrap">
                {readOnly ? "View" : "Actions"}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t border-warm-beige/30 hover:bg-warm-beige/10">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-charcoal/80 max-w-[240px]">
                    <div className="truncate" title={typeof cellValue(item, col) === "string" ? String(cellValue(item, col)) : undefined}>
                      {cellValue(item, col)}
                    </div>
                  </td>
                ))}
                <td className="px-4 py-3">
                  <ActionButtons
                    item={item}
                    readOnly={readOnly}
                    onToggleVisibility={onToggleVisibility}
                    editHref={editHref}
                    onDelete={onDelete}
                  />
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
