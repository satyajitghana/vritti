"use client";

import { useState } from "react";
import {
  AngleSlider,
  AngleSliderRange,
  AngleSliderThumb,
  AngleSliderTrack,
  AngleSliderValue,
} from "./component";

export default function AngleSliderExample() {
  const [value, setValue] = useState([45]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <AngleSlider
        value={value}
        onValueChange={setValue}
        min={0}
        max={360}
        step={1}
      >
        <AngleSliderTrack>
          <AngleSliderRange />
        </AngleSliderTrack>
        <AngleSliderThumb />
        <AngleSliderValue />
      </AngleSlider>
      <p className="text-sm text-muted-foreground">
        Angle: {value[0]}
      </p>
    </div>
  );
}
