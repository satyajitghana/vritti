"use client";

import { useState } from "react";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxTrigger,
} from "./component";

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "nextjs", label: "Next.js" },
  { value: "nuxt", label: "Nuxt" },
  { value: "remix", label: "Remix" },
];

export default function ComboboxExample() {
  const [value, setValue] = useState<string>("");

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="w-full max-w-sm">
        <Combobox
          value={value}
          onValueChange={setValue}
        >
          <ComboboxLabel>Framework</ComboboxLabel>
          <ComboboxAnchor>
            <ComboboxInput placeholder="Search frameworks..." />
            <ComboboxTrigger />
          </ComboboxAnchor>
          <ComboboxContent>
            <ComboboxEmpty />
            {frameworks.map((framework) => (
              <ComboboxItem key={framework.value} value={framework.value}>
                {framework.label}
              </ComboboxItem>
            ))}
          </ComboboxContent>
        </Combobox>
      </div>
      <p className="text-sm text-muted-foreground">
        Selected: {value || "None"}
      </p>
    </div>
  );
}
