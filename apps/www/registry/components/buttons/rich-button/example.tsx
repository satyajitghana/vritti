"use client";

import { RichButton } from "./component";

export default function RichButtonExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <RichButton>Default</RichButton>
      <RichButton color="blue">Blue</RichButton>
      <RichButton color="purple">Purple</RichButton>
      <RichButton color="pink">Pink</RichButton>
    </div>
  );
}
