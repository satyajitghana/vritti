import { Showcase } from "./component";

const items = [
  {
    heading: "Beautiful Design",
    description: "Crafted with attention to every detail.",
    media: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
  },
  {
    heading: "Fast Performance",
    description: "Optimized for speed and efficiency.",
    media: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
  },
  {
    heading: "Modern Stack",
    description: "Built with the latest technologies.",
    media: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
  },
];

export default function ShowcaseExample() {
  return (
    <div className="w-full rounded-lg overflow-hidden border p-4">
      <Showcase items={items} cycleDelay={3000} mediaClass="h-64 md:h-80" />
    </div>
  );
}
