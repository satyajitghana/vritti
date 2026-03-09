"use client";

import { PlaceholdersAndVanishInput } from "./component";

export default function PlaceholdersAndVanishInputExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <PlaceholdersAndVanishInput
        placeholders={[
          "Search for components...",
          "Try 'button' or 'modal'...",
          "What are you looking for?",
          "Type something and press Enter...",
        ]}
        onChange={() => {}}
        onSubmit={() => {}}
      />
    </div>
  );
}
