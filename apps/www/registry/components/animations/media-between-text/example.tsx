"use client";

import { MediaBetweenText } from "./component";

export default function MediaBetweenTextExample() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <MediaBetweenText
        firstText="Hello"
        secondText="World"
        mediaUrl="https://picsum.photos/seed/media/200/100"
        mediaType="image"
        className="items-center gap-2 text-4xl font-bold cursor-pointer"
        mediaContainerClassName="h-12 rounded-lg overflow-hidden"
      />
    </div>
  );
}
