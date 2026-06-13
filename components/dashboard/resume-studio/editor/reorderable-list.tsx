"use client";

import { DotsSixVertical, Plus, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createItem } from "@/lib/resume-studio/sections";
import type { EditorItem } from "@/lib/resume-studio/types";

export function ReorderableList({
  items,
  onChange,
  placeholder
}: {
  items: EditorItem[];
  onChange: (items: EditorItem[]) => void;
  placeholder: string;
}) {
  const visibleItems = items.length ? items : [createItem()];

  function updateItem(id: string, text: string) {
    onChange(visibleItems.map((item) => (item.id === id ? { ...item, text } : item)));
  }

  function removeItem(id: string) {
    const next = visibleItems.filter((item) => item.id !== id);
    onChange(next);
  }

  function addItem() {
    onChange([...visibleItems, createItem()]);
  }

  function moveItem(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= visibleItems.length) {
      return;
    }

    const next = [...visibleItems];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {visibleItems.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData("text/plain", String(index));
            event.dataTransfer.effectAllowed = "move";
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const fromIndex = Number(event.dataTransfer.getData("text/plain"));
            moveItem(fromIndex, index);
          }}
          className="group flex gap-2 rounded-xl border border-border bg-[#fbfaf6] p-2"
        >
          <button
            type="button"
            className="mt-2 cursor-grab text-muted-foreground active:cursor-grabbing"
            aria-label="Reorder item"
          >
            <DotsSixVertical className="h-4 w-4" weight="bold" />
          </button>
          <Textarea
            value={item.text}
            onChange={(event) => updateItem(item.id, event.target.value)}
            placeholder={placeholder}
            className="min-h-24 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="mt-1 h-8 w-8 shrink-0 p-0 opacity-60 group-hover:opacity-100"
            onClick={() => removeItem(item.id)}
            aria-label="Delete item"
          >
            <Trash className="h-4 w-4" weight="regular" />
          </Button>
        </div>
      ))}
      <Button type="button" size="sm" variant="outline" onClick={addItem}>
        <Plus className="h-4 w-4" weight="regular" />
        Add item
      </Button>
    </div>
  );
}
