"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";

// Sortable Row Component
interface SortableRowProps {
  id: string;
  children: React.ReactNode;
}

const SortableRow: React.FC<SortableRowProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    opacity: isDragging ? 0.9 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        border-b transition-all duration-150 cursor-grab
        hover:bg-[var(--platform-card-bg)]/50 hover:shadow-sm
      
      `}
      title="Drag to reorder"
    >
      {children}
    </tr>
  );
};

// Main Sortable DataTable Component
interface SortableDataTableProps<
  TData extends { id: string; index?: number | null }
> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  loading?: boolean;
  emptyMessage?: string;
  onDeleteSelected?: (selectedRows: TData[]) => void;
  onUpdateOrder?: (orderData: { id: string; index: number }[]) => Promise<void>;
  // Translation function and button labels
  t?: (key: string) => string;
  resetOrderLabel?: string;
  saveOrderLabel?: string;
  savingLabel?: string;
  unsavedChangesMessage?: string;
}

export function SortableDataTable<
  TData extends { id: string; index?: number | null }
>({
  columns,
  data,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  loading,
  emptyMessage,
  onDeleteSelected,
  onUpdateOrder,
  t,
  resetOrderLabel = "Reset Order",
  saveOrderLabel = "Save Order",
  savingLabel = "Saving...",
  unsavedChangesMessage = "You have unsaved changes. Don't forget to save your new order!",
}: SortableDataTableProps<TData>) {
  const [sortableData, setSortableData] = useState<TData[]>(data);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => {
      if (
        a.index !== null &&
        a.index !== undefined &&
        b.index !== null &&
        b.index !== undefined
      ) {
        return a.index - b.index;
      }
      if (
        a.index !== null &&
        a.index !== undefined &&
        (b.index === null || b.index === undefined)
      )
        return -1;
      if (
        (a.index === null || a.index === undefined) &&
        b.index !== null &&
        b.index !== undefined
      )
        return 1;

      // Fallback to name sorting if available
      const aName = (a as unknown as { name?: string }).name || "";
      const bName = (b as unknown as { name?: string }).name || "";
      return aName.localeCompare(bName);
    });
    setSortableData(sortedData);
    setHasChanges(false);
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSortableData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return items;

        const newItems = arrayMove(items, oldIndex, newIndex);

        const updatedItems = newItems.map((item, index) => ({
          ...item,
          index: index + 1,
        }));

        return updatedItems;
      });

      setHasChanges(true);
    }
  };

  const handleSaveOrder = async () => {
    if (!hasChanges || !onUpdateOrder) return;

    setIsSaving(true);
    try {
      const orderData = sortableData.map((item, index) => ({
        id: item.id,
        index: index + 1,
      }));

      await onUpdateOrder(orderData);
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving order:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetOrder = () => {
    const sortedData = [...data].sort((a, b) => {
      if (
        a.index !== null &&
        a.index !== undefined &&
        b.index !== null &&
        b.index !== undefined
      ) {
        return a.index - b.index;
      }
      if (
        a.index !== null &&
        a.index !== undefined &&
        (b.index === null || b.index === undefined)
      )
        return -1;
      if (
        (a.index === null || a.index === undefined) &&
        b.index !== null &&
        b.index !== undefined
      )
        return 1;

      const aName = (a as unknown as { name?: string }).name || "";
      const bName = (b as unknown as { name?: string }).name || "";
      return aName.localeCompare(bName);
    });
    setSortableData(sortedData);
    setHasChanges(false);
  };

  return (
    <div className="space-y-4">
      {/* Order Control Buttons */}
      {onUpdateOrder && hasChanges && (
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="outline"
            onClick={handleResetOrder}
            className="text-gray-600 hover:text-gray-800 border-gray-300 hover:border-gray-400"
          >
            {t ? t("modal.buttons.resetOrder") : resetOrderLabel}
          </Button>
          <Button
            onClick={handleSaveOrder}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
          >
            {isSaving
              ? t
                ? t("modal.buttons.saving")
                : savingLabel
              : t
              ? t("modal.buttons.saveOrder")
              : saveOrderLabel}
          </Button>
        </div>
      )}

      {/* Unsaved Changes Warning */}
      {onUpdateOrder && hasChanges && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            {t ? t("unsavedChanges") : unsavedChangesMessage}
          </p>
        </div>
      )}

      {/* Sortable DataTable */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortableData.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <DataTable
            columns={columns}
            data={sortableData}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            searchPlaceholder={searchPlaceholder}
            loading={loading}
            emptyMessage={emptyMessage}
            onDeleteSelected={onDeleteSelected}
            rowComponent={({ row, children }) => (
              <SortableRow id={row.original.id}>{children}</SortableRow>
            )}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
}
