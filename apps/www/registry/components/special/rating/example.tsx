"use client";

import { useState } from "react";
import { Rating, RatingButton } from "./component";

export default function RatingExample() {
  const [value, setValue] = useState(3);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Rating value={value} onValueChange={setValue}>
        <RatingButton />
        <RatingButton />
        <RatingButton />
        <RatingButton />
        <RatingButton />
      </Rating>
      <p className="text-sm text-muted-foreground">
        Selected: {value} / 5
      </p>
    </div>
  );
}
