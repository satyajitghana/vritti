"use client"

import { HoldToConfirm } from "./component";

export default function HoldToConfirmExample() {
  return (
    <div className="relative flex h-[200px] w-full items-center justify-center gap-4 overflow-hidden rounded-lg border">
      <HoldToConfirm
        duration={2000}
        onConfirm={() => console.log("Confirmed!")}
        fillClassName="bg-green-500/30"
        confirmedChildren={<span>Confirmed!</span>}
        confirmedClassName="text-green-500"
      >
        Hold to confirm
      </HoldToConfirm>

      <HoldToConfirm
        duration={1500}
        animation="border"
        variant="outline"
        fillClassName="border-blue-500"
        onConfirm={() => console.log("Done!")}
        confirmedChildren={<span>Done!</span>}
      >
        Hold (border)
      </HoldToConfirm>
    </div>
  );
}
