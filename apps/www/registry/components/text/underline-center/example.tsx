"use client";

import CenterUnderline from "./component";

export default function UnderlineCenterExample() {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center gap-6">
      <CenterUnderline className="text-3xl font-semibold">
        Hover for center underline
      </CenterUnderline>
      <CenterUnderline className="text-xl">
        Another example
      </CenterUnderline>
    </div>
  );
}
