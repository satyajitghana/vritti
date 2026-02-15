"use client";

import VariableFontHoverByLetter from "./component";

export default function VariableFontHoverByLetterExample() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <VariableFontHoverByLetter
        label="Variable Font"
        fromFontVariationSettings="'wght' 400, 'slnt' 0"
        toFontVariationSettings="'wght' 900, 'slnt' -10"
        className="text-4xl cursor-pointer"
        staggerDuration={0.03}
        staggerFrom="first"
      />
    </div>
  );
}
