"use client";

import { SpotifyCard } from "./component";

export default function SpotifyCardExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <SpotifyCard url="https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT" />
    </div>
  );
}
