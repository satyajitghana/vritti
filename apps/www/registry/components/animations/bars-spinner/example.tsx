"use client";

import { BarsSpinner } from "./component";

export default function BarsSpinnerExample() {
  return (
    <div className="flex items-center justify-center gap-4 p-8">
      <BarsSpinner size={24} />
      <BarsSpinner size={32} />
      <BarsSpinner size={48} />
    </div>
  );
}
