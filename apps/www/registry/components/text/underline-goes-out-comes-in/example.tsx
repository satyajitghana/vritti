"use client";

import GoesOutComesInUnderline from "./component";

export default function UnderlineGoesOutComesInExample() {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center gap-6">
      <GoesOutComesInUnderline className="text-3xl font-semibold" direction="left">
        Goes out, comes in (left)
      </GoesOutComesInUnderline>
      <GoesOutComesInUnderline className="text-xl" direction="right">
        Goes out, comes in (right)
      </GoesOutComesInUnderline>
    </div>
  );
}
