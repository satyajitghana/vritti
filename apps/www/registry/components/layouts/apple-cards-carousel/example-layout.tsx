"use client";

import { Carousel, Card } from "./component";

const data = [
  {
    category: "Design",
    title: "Minimal Aesthetics",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop",
    content: (
      <div>
        <p className="text-neutral-600 dark:text-neutral-400">
          Clean, minimal design with purposeful white space and elegant typography.
        </p>
      </div>
    ),
  },
  {
    category: "Technology",
    title: "Future of AI",
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=800&fit=crop",
    content: (
      <div>
        <p className="text-neutral-600 dark:text-neutral-400">
          Exploring the cutting edge of artificial intelligence and machine learning.
        </p>
      </div>
    ),
  },
  {
    category: "Productivity",
    title: "Work Smarter",
    src: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=600&h=800&fit=crop",
    content: (
      <div>
        <p className="text-neutral-600 dark:text-neutral-400">
          Tools and techniques for maximizing your daily productivity.
        </p>
      </div>
    ),
  },
  {
    category: "Culture",
    title: "Digital Art",
    src: "https://images.unsplash.com/photo-1633186223163-0399f4dbb7f3?w=600&h=800&fit=crop",
    content: (
      <div>
        <p className="text-neutral-600 dark:text-neutral-400">
          The intersection of creativity and technology in modern art.
        </p>
      </div>
    ),
  },
];

export default function AppleCardsCarouselLayoutExample() {
  return (
    <div className="w-full py-8">
      <Carousel
        items={data.map((card, index) => (
          <Card key={card.src} card={card} index={index} layout />
        ))}
      />
    </div>
  );
}
