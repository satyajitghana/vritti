"use client";
import { Transition } from "./component";

export default function TransitionExample() {
  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden border">
      <Transition
        intro={
          <div className="text-white dark:text-black text-2xl font-bold">
            Welcome
          </div>
        }
        introDuration={2}
        transitionDuration={1}
        type="curved"
        direction="bottom"
        className="bg-neutral-900 dark:bg-white"
      >
        <div className="flex items-center justify-center h-full bg-background">
          <p className="text-lg font-medium">Main Content</p>
        </div>
      </Transition>
    </div>
  );
}
