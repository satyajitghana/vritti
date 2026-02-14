"use client";

import { useState } from "react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadList,
} from "./component";

export default function FileUploadExample() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <FileUpload
        value={files}
        onValueChange={setFiles}
        maxFiles={5}
        maxFileSize={10 * 1024 * 1024}
        accept="image/*,application/pdf"
      >
        <FileUploadDropzone />
        <FileUploadList>
          {files.map((file, index) => (
            <FileUploadItem key={index} value={file}>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="truncate text-sm">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <FileUploadItemDelete />
            </FileUploadItem>
          ))}
        </FileUploadList>
      </FileUpload>
    </div>
  );
}
