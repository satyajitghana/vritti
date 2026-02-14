"use client";

import { useState } from "react";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputLabel,
  TagsInputList,
} from "./component";

export default function TagsInputExample() {
  const [values, setValues] = useState<string[]>(["React", "TypeScript"]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <TagsInput value={values} onValueChange={setValues}>
        <TagsInputLabel>Technologies</TagsInputLabel>
        <TagsInputList>
          {values.map((value) => (
            <TagsInputItem key={value} value={value}>
              {value}
            </TagsInputItem>
          ))}
          <TagsInputInput placeholder="Add tag..." />
        </TagsInputList>
      </TagsInput>
      <p className="text-sm text-muted-foreground">
        Tags: {values.join(", ")}
      </p>
    </div>
  );
}
