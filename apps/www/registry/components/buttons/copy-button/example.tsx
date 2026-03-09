"use client";

import { CopyButton } from "./component";

export default function CopyButtonExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <CopyButton value="Hello, World!" />
    </div>
  );
}
