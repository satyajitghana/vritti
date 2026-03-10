"use client";

import { Tooltip } from "./component";

export default function TooltipCardExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <Tooltip
        content={
          <div>
            <p className="font-semibold">Hover Tooltip</p>
            <p className="text-xs text-neutral-500">This tooltip follows your cursor and stays within the viewport.</p>
          </div>
        }
      >
        <button className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium dark:bg-neutral-800">
          Hover over me
        </button>
      </Tooltip>
    </div>
  );
}
