"use client";

import { SpotifyCard } from "./component";

export default function SpotifyCardExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <SpotifyCard url="https://open.spotify.com/track/5ThyDv6aRVU8AH4vXQNldF" />
    </div>
  );
}
