import { Showcase } from "./component";

const items = [
  {
    heading: "Beautiful Design",
    description: "Crafted with attention to every detail.",
    media: "/placeholder.jpg",
  },
  {
    heading: "Fast Performance",
    description: "Optimized for speed and efficiency.",
    media: "/placeholder.jpg",
  },
  {
    heading: "Modern Stack",
    description: "Built with the latest technologies.",
    media: "/placeholder.jpg",
  },
];

export default function ShowcaseExample() {
  return (
    <div className="w-full rounded-lg overflow-hidden border p-4">
      <Showcase items={items} cycleDelay={3000} mediaClass="h-64 md:h-80" />
    </div>
  );
}
