"use client";

import TeamSelector from "./component";

export default function TeamSelectorExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <TeamSelector defaultValue={2} onChange={(size) => console.log("Team size:", size)} />
    </div>
  );
}
