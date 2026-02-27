"use client";

import OrbitLoader from "./component";

export default function OrbitLoaderExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <OrbitLoader title="Configuring your account..." subtitle="Please wait while we prepare everything for you" />
    </div>
  );
}
