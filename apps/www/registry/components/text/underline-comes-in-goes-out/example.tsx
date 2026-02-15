"use client";

import ComesInGoesOutUnderline from "./component";

export default function UnderlineComesInGoesOutExample() {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center gap-6">
      <ComesInGoesOutUnderline className="text-3xl font-semibold" direction="left">
        Comes in, goes out (left)
      </ComesInGoesOutUnderline>
      <ComesInGoesOutUnderline className="text-xl" direction="right">
        Comes in, goes out (right)
      </ComesInGoesOutUnderline>
    </div>
  );
}
