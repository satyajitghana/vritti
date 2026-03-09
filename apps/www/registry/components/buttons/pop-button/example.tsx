"use client";

import { PopButton } from "./component";

export default function PopButtonExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <PopButton>Default</PopButton>
      <PopButton color="blue">Blue</PopButton>
      <PopButton color="green">Green</PopButton>
      <PopButton color="red">Red</PopButton>
    </div>
  );
}
