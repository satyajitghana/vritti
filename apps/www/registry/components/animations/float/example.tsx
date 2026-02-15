"use client";

import Float from "./component";

export default function FloatExample() {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center">
      <Float>
        <div className="w-40 h-40 shadow-2xl relative overflow-hidden hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg">
          <img
            src="https://picsum.photos/seed/float/300/300"
            className="w-full h-full object-cover absolute top-0 left-0"
            alt="Floating element"
          />
        </div>
      </Float>
      <h2 className="pt-12 text-2xl uppercase z-10">
        Floating Element
      </h2>
    </div>
  );
}
