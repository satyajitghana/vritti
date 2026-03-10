"use client";

import { Pointer } from "./component";

export default function PointerExample() {
  return (
    <div className="relative flex h-40 flex-col items-center justify-center rounded-lg border p-4">
      <h3 className="text-xl font-semibold">Hover me</h3>
      <p className="text-sm text-muted-foreground">A pointer will follow your cursor</p>
      <Pointer className="fill-blue-500" />
    </div>
  );
}
