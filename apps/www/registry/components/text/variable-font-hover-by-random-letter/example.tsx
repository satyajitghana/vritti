"use client";

import VariableFontHoverByRandomLetter from "./component";

export default function VariableFontHoverByRandomLetterExample() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <VariableFontHoverByRandomLetter
        label="Random Variable"
        fromFontVariationSettings="'wght' 400, 'slnt' 0"
        toFontVariationSettings="'wght' 900, 'slnt' -10"
        className="text-4xl cursor-pointer"
        staggerDuration={0.03}
      />
    </div>
  );
}
