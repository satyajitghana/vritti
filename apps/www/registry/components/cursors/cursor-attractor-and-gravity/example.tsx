"use client";

import Gravity, { MatterBody } from "./component";

export default function CursorAttractorAndGravityExample() {
  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg border">
      <Gravity
        attractorPoint={{ x: 0.5, y: 0.5 }}
        attractorStrength={0.002}
        cursorStrength={0.001}
        cursorFieldRadius={150}
      >
        {["red", "blue", "green", "purple", "orange"].map((color, i) => (
          <MatterBody
            key={color}
            x={`${20 + i * 15}%`}
            y="20%"
            matterBodyOptions={{ restitution: 0.5 }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
              style={{ backgroundColor: color }}
            >
              {i + 1}
            </div>
          </MatterBody>
        ))}
      </Gravity>
    </div>
  );
}
