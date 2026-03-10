"use client";

import SimpleCarousel from "./component";

export default function SimpleCarouselExample() {
  return (
    <div className="w-full overflow-hidden">
      <SimpleCarousel
        baseVelocity={3}
        direction="left"
        slowdownOnHover
        className="py-4"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-48 h-32 mx-4 rounded-lg overflow-hidden shrink-0"
          >
            <img
              src="/placeholder.jpg"
              alt={`Slide ${i}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </SimpleCarousel>
    </div>
  );
}
