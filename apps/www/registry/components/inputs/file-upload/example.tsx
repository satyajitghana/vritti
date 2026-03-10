"use client";

import FileUpload from "./component";

export default function FileUploadExample() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <FileUpload
          onUploadSuccess={(file) => console.log("Uploaded:", file.name)}
          acceptedFileTypes={["image/*"]}
          maxFileSize={5 * 1024 * 1024}
        />
      </div>
    </div>
  );
}
