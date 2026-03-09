"use client";

import { PlaceholdersAndVanishInput } from "./component";

export default function PlaceholdersAndVanishInputSearchExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <PlaceholdersAndVanishInput
        placeholders={[
          "How do I center a div?",
          "What is React Server Components?",
          "Explain TypeScript generics",
          "Best practices for CSS Grid",
        ]}
        onChange={() => {}}
        onSubmit={() => {}}
      />
    </div>
  );
}
