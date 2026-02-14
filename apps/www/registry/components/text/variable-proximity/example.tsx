"use client";

import VariableProximity from "./component";
import { useRef } from "react";

export default function VariableProximityExample() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="flex items-center justify-center p-8">
      <VariableProximity
        label="Hello World"
        fromFontVariationSettings="'wght' 400"
        toFontVariationSettings="'wght' 900"
        containerRef={containerRef}
      />
    </div>
  );
}
