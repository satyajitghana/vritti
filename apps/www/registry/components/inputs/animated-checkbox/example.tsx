"use client";

import { AnimatedCheckbox } from "./component";

export default function AnimatedCheckboxExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <AnimatedCheckbox title="Buy groceries" />
      <AnimatedCheckbox title="Walk the dog" defaultChecked />
      <AnimatedCheckbox title="Write some code" />
    </div>
  );
}
