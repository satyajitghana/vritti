"use client";

import { TextMarquee } from "./component";

export default function TextMarqueeExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <TextMarquee>
        {["First Line", "Second Line", "Third Line", "Fourth Line"]}
      </TextMarquee>
    </div>
  );
}
