"use client";

import VariableProximity from "./component";
import { useRef, useEffect } from "react";

export default function VariableProximityExample() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = "roboto-flex-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div ref={containerRef} className="flex items-center justify-center p-8">
      <VariableProximity
        label="Hello World"
        fromFontVariationSettings="'wght' 400"
        toFontVariationSettings="'wght' 900"
        containerRef={containerRef}
        className="text-4xl"
        radius={100}
      />
    </div>
  );
}
