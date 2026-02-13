"use client";

import { useState } from "react";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "./component";

export default function DropzoneExample() {
  const [files, setFiles] = useState<File[]>();

  return (
    <div className="flex w-full max-w-md items-center justify-center p-8">
      <Dropzone
        accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif"] }}
        maxSize={5 * 1024 * 1024}
        onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
        src={files}
      >
        <DropzoneContent />
        <DropzoneEmptyState />
      </Dropzone>
    </div>
  );
}
