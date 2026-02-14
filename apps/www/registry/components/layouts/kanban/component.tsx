"use client";

import * as KanbanPrimitive from "@diceui/kanban";
import { GripVertical } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

function Kanban({
  className,
  ...props
}: React.ComponentProps<typeof KanbanPrimitive.Root>) {
  return (
    <KanbanPrimitive.Root
      data-slot="kanban"
      className={cn("flex gap-4", className)}
      {...props}
    />
  );
}

function KanbanBoard({
  className,
  ...props
}: React.ComponentProps<typeof KanbanPrimitive.Board>) {
  return (
    <KanbanPrimitive.Board
      data-slot="kanban-board"
      className={cn("flex gap-4", className)}
      {...props}
    />
  );
}

function KanbanColumn({
  className,
  children,
  ...props
}: React.ComponentProps<typeof KanbanPrimitive.Column>) {
  return (
    <KanbanPrimitive.Column
      data-slot="kanban-column"
      className={cn(
        "flex w-[280px] shrink-0 flex-col gap-2 rounded-lg border bg-muted/40 p-2",
        "data-[dragging]:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </KanbanPrimitive.Column>
  );
}

function KanbanColumnHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kanban-column-header"
      className={cn(
        "flex items-center justify-between px-2 py-1.5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function KanbanColumnHandle({
  className,
  ...props
}: React.ComponentProps<typeof KanbanPrimitive.ColumnHandle>) {
  return (
    <KanbanPrimitive.ColumnHandle
      data-slot="kanban-column-handle"
      className={cn(
        "flex cursor-grab items-center text-muted-foreground hover:text-foreground active:cursor-grabbing",
        className,
      )}
      {...props}
    >
      <GripVertical className="size-4" />
    </KanbanPrimitive.ColumnHandle>
  );
}

function KanbanItems({
  className,
  ...props
}: React.ComponentProps<typeof KanbanPrimitive.Items>) {
  return (
    <KanbanPrimitive.Items
      data-slot="kanban-items"
      className={cn("flex min-h-[100px] flex-col gap-2", className)}
      {...props}
    />
  );
}

function KanbanItem({
  className,
  ...props
}: React.ComponentProps<typeof KanbanPrimitive.Item>) {
  return (
    <KanbanPrimitive.Item
      data-slot="kanban-item"
      className={cn(
        "rounded-md border bg-card p-3 shadow-sm transition-colors",
        "data-[dragging]:opacity-50 data-[dragging]:shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

function KanbanItemHandle({
  className,
  ...props
}: React.ComponentProps<typeof KanbanPrimitive.ItemHandle>) {
  return (
    <KanbanPrimitive.ItemHandle
      data-slot="kanban-item-handle"
      className={cn(
        "flex cursor-grab items-center text-muted-foreground hover:text-foreground active:cursor-grabbing",
        className,
      )}
      {...props}
    >
      <GripVertical className="size-4" />
    </KanbanPrimitive.ItemHandle>
  );
}

function KanbanOverlay({
  className,
  ...props
}: React.ComponentProps<typeof KanbanPrimitive.Overlay>) {
  return (
    <KanbanPrimitive.Overlay
      data-slot="kanban-overlay"
      className={cn("", className)}
      {...props}
    />
  );
}

export {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnHeader,
  KanbanColumnHandle,
  KanbanItems,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
};
