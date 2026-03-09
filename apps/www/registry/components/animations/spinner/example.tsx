"use client";

import { Spinner } from "./component";

export default function SpinnerExample() {
  return (
    <div className="flex items-center justify-center gap-4 p-8">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
    </div>
  );
}
