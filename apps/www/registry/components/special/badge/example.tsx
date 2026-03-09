"use client";

import { Badge } from "./component";

export default function BadgeExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-8">
      <Badge>Default</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="red">Red</Badge>
      <Badge variant="purple">Purple</Badge>
    </div>
  );
}
