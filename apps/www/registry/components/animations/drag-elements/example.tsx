"use client";

import DragElements from "./component";

export default function DragElementsExample() {
  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg border">
      <DragElements>
        <div className="w-24 h-24 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold shadow-lg top-10 left-10">
          Drag me
        </div>
        <div className="w-24 h-24 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold shadow-lg top-20 left-40">
          Drag me
        </div>
        <div className="w-24 h-24 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold shadow-lg top-32 left-20">
          Drag me
        </div>
      </DragElements>
    </div>
  );
}
