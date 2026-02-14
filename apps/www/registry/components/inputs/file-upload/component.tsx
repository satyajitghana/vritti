"use client";

import * as FileUploadPrimitive from "@diceui/file-upload";
import { Upload, X } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

function FileUpload({
  className,
  ...props
}: React.ComponentProps<typeof FileUploadPrimitive.Root>) {
  return (
    <FileUploadPrimitive.Root
      data-slot="file-upload"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  );
}

function FileUploadDropzone({
  className,
  children,
  ...props
}: React.ComponentProps<typeof FileUploadPrimitive.Dropzone>) {
  return (
    <FileUploadPrimitive.Dropzone
      data-slot="file-upload-dropzone"
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10 px-6 py-10 text-center transition-colors hover:bg-muted/20 data-[dragging]:border-primary data-[dragging]:bg-primary/5",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-sm">
              Drag & drop files here, or click to select
            </p>
            <p className="text-xs text-muted-foreground">
              You can upload files up to 10MB
            </p>
          </div>
          <FileUploadPrimitive.Trigger className="mt-2 inline-flex h-8 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
            Browse Files
          </FileUploadPrimitive.Trigger>
        </>
      )}
    </FileUploadPrimitive.Dropzone>
  );
}

function FileUploadList({
  className,
  ...props
}: React.ComponentProps<typeof FileUploadPrimitive.List>) {
  return (
    <FileUploadPrimitive.List
      data-slot="file-upload-list"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function FileUploadItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof FileUploadPrimitive.Item>) {
  return (
    <FileUploadPrimitive.Item
      data-slot="file-upload-item"
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-card px-3 py-2 text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </FileUploadPrimitive.Item>
  );
}

function FileUploadItemPreview({
  className,
  ...props
}: React.ComponentProps<typeof FileUploadPrimitive.ItemPreview>) {
  return (
    <FileUploadPrimitive.ItemPreview
      data-slot="file-upload-item-preview"
      className={cn("size-10 shrink-0 overflow-hidden rounded", className)}
      {...props}
    />
  );
}

function FileUploadItemMetadata({
  className,
  ...props
}: React.ComponentProps<typeof FileUploadPrimitive.ItemMetadata>) {
  return (
    <FileUploadPrimitive.ItemMetadata
      data-slot="file-upload-item-metadata"
      className={cn("flex min-w-0 flex-1 flex-col", className)}
      {...props}
    />
  );
}

function FileUploadItemDelete({
  className,
  ...props
}: React.ComponentProps<typeof FileUploadPrimitive.ItemDelete>) {
  return (
    <FileUploadPrimitive.ItemDelete
      data-slot="file-upload-item-delete"
      className={cn(
        "ml-auto inline-flex size-7 items-center justify-center rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className,
      )}
      {...props}
    >
      <X className="size-4" />
    </FileUploadPrimitive.ItemDelete>
  );
}

export {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemMetadata,
  FileUploadItemDelete,
};
