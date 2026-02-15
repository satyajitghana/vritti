"use client";

import CirclingElements from "./component";

export default function CirclingElementsExample() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <CirclingElements radius={120} duration={8} pauseOnHover>
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          1
        </div>
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
          2
        </div>
        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
          3
        </div>
        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
          4
        </div>
      </CirclingElements>
    </div>
  );
}
