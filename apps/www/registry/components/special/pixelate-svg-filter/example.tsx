"use client";

import PixelateSvgFilter from "./component";

export default function PixelateSvgFilterExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <div className="relative h-64 w-64 overflow-hidden rounded-lg">
        <PixelateSvgFilter id="demo-pixelate" size={12} />
        <div
          className="h-full w-full"
          style={{ filter: "url(#demo-pixelate)" }}
        >
          <div className="grid h-full w-full grid-cols-4 grid-rows-4">
            <div className="bg-emerald-400" />
            <div className="bg-sky-400" />
            <div className="bg-violet-400" />
            <div className="bg-amber-400" />
            <div className="bg-rose-400" />
            <div className="bg-emerald-300" />
            <div className="bg-sky-300" />
            <div className="bg-violet-300" />
            <div className="bg-amber-300" />
            <div className="bg-rose-300" />
            <div className="bg-emerald-500" />
            <div className="bg-sky-500" />
            <div className="bg-violet-500" />
            <div className="bg-amber-500" />
            <div className="bg-rose-500" />
            <div className="bg-emerald-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
