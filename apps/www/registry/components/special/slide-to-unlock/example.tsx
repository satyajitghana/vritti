"use client";

import {
  SlideToUnlock,
  SlideToUnlockTrack,
  SlideToUnlockText,
  SlideToUnlockHandle,
} from "./component";

export default function SlideToUnlockExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <SlideToUnlock onUnlock={() => alert("Unlocked!")}>
        <SlideToUnlockTrack>
          <SlideToUnlockText>
            <span className="text-sm text-muted-foreground">slide to unlock</span>
          </SlideToUnlockText>
          <SlideToUnlockHandle />
        </SlideToUnlockTrack>
      </SlideToUnlock>
    </div>
  );
}
