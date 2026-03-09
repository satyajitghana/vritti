"use client";

import { Carousel, Card } from "./component";

const data = [
  {
    category: "Nature",
    title: "Mountain Sunrise",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=800&fit=crop",
    content: <p className="text-neutral-600 dark:text-neutral-400">A breathtaking mountain landscape at dawn.</p>,
  },
  {
    category: "Architecture",
    title: "Modern Design",
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=800&fit=crop",
    content: <p className="text-neutral-600 dark:text-neutral-400">Contemporary architecture with clean lines.</p>,
  },
  {
    category: "Travel",
    title: "Ocean View",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop",
    content: <p className="text-neutral-600 dark:text-neutral-400">A serene ocean view from a tropical beach.</p>,
  },
];

export default function AppleCardsCarouselExample() {
  return (
    <div className="w-full py-8">
      <Carousel
        items={data.map((card, index) => (
          <Card key={card.src} card={card} index={index} />
        ))}
      />
    </div>
  );
}
