"use client";

import { LabelInput } from "./component";

export default function LabelInputExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 max-w-sm mx-auto">
      <LabelInput label="Email" type="email" />
      <LabelInput label="Password" type="password" />
    </div>
  );
}
