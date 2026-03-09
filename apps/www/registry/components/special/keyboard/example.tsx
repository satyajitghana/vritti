"use client";

import { Keyboard } from "./component";

export default function KeyboardExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <Keyboard showPreview />
    </div>
  );
}
