"use client";

import KokonutLoader from "./component";

export default function KokonutLoaderExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <KokonutLoader title="Configuring your account..." subtitle="Please wait while we prepare everything for you" />
    </div>
  );
}
