"use client";

import { FollowerPointerCard } from "./component";

export default function FollowingPointerExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <FollowerPointerCard
        title="Hello!"
        className="w-80 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <h3 className="text-lg font-semibold">Hover over this card</h3>
        <p className="mt-2 text-sm text-neutral-500">
          A custom pointer follows your cursor with a colored label.
        </p>
      </FollowerPointerCard>
    </div>
  );
}
