"use client";

import { useState } from "react";
import Antigravity from "./component";

export default function AntigravityPlayground() {
  const [count, setCount] = useState(300);
  const [particleShape, setParticleShape] = useState<
    "capsule" | "sphere" | "box" | "tetrahedron"
  >("capsule");
  const [color, setColor] = useState("#FF9FFC");
  const [ringRadius, setRingRadius] = useState(10);
  const [magnetRadius, setMagnetRadius] = useState(10);
  const [waveAmplitude, setWaveAmplitude] = useState(1);

  return (
    <div className="w-full space-y-4">
      <div className="w-full h-[400px] rounded-lg overflow-hidden border">
        <Antigravity
          count={count}
          particleShape={particleShape}
          color={color}
          ringRadius={ringRadius}
          magnetRadius={magnetRadius}
          waveAmplitude={waveAmplitude}
          autoAnimate
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <label className="flex flex-col gap-1">
          <span className="text-muted-foreground">Shape</span>
          <select
            value={particleShape}
            onChange={(e) =>
              setParticleShape(
                e.target.value as "capsule" | "sphere" | "box" | "tetrahedron"
              )
            }
            className="rounded border bg-background px-2 py-1"
          >
            <option value="capsule">Capsule</option>
            <option value="sphere">Sphere</option>
            <option value="box">Box</option>
            <option value="tetrahedron">Tetrahedron</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-muted-foreground">Color</span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-full rounded border bg-background"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-muted-foreground">Count ({count})</span>
          <input
            type="range"
            min={50}
            max={800}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-muted-foreground">
            Ring Radius ({ringRadius})
          </span>
          <input
            type="range"
            min={2}
            max={30}
            value={ringRadius}
            onChange={(e) => setRingRadius(Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-muted-foreground">
            Magnet Radius ({magnetRadius})
          </span>
          <input
            type="range"
            min={2}
            max={30}
            value={magnetRadius}
            onChange={(e) => setMagnetRadius(Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-muted-foreground">
            Wave Amplitude ({waveAmplitude.toFixed(1)})
          </span>
          <input
            type="range"
            min={0}
            max={5}
            step={0.1}
            value={waveAmplitude}
            onChange={(e) => setWaveAmplitude(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
