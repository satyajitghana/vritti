"use client";

import { FlowButton } from "./component";

export default function FlowButtonExample() {
  return (
    <div className="flex items-center justify-center gap-4 p-8">
      <FlowButton>Flow Button</FlowButton>
      <FlowButton size="lg">Large Flow</FlowButton>
    </div>
  );
}
