"use client";

import { useRef } from "react";
import BoxCarousel, { type BoxCarouselRef, type CarouselItem } from "./component";

const items: CarouselItem[] = [
  { id: "1", type: "image", src: "https://picsum.photos/seed/box1/400/300", alt: "Image 1" },
  { id: "2", type: "image", src: "https://picsum.photos/seed/box2/400/300", alt: "Image 2" },
  { id: "3", type: "image", src: "https://picsum.photos/seed/box3/400/300", alt: "Image 3" },
  { id: "4", type: "image", src: "https://picsum.photos/seed/box4/400/300", alt: "Image 4" },
  { id: "5", type: "image", src: "https://picsum.photos/seed/box5/400/300", alt: "Image 5" },
];

export default function BoxCarouselExample() {
  const carouselRef = useRef<BoxCarouselRef>(null);

  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center gap-4">
      <BoxCarousel
        ref={carouselRef}
        items={items}
        width={400}
        height={300}
        direction="left"
        autoPlay
        autoPlayInterval={3000}
      />
      <div className="flex gap-2">
        <button
          onClick={() => carouselRef.current?.prev()}
          className="px-4 py-2 bg-foreground text-background rounded-md"
        >
          Prev
        </button>
        <button
          onClick={() => carouselRef.current?.next()}
          className="px-4 py-2 bg-foreground text-background rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}
