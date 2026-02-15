import { FlipFlow } from "./component";

const data = [
  { name: "React" },
  { name: "Next.js" },
  { name: "Tailwind" },
  { name: "Motion" },
  { name: "TypeScript" },
  { name: "Vercel" },
];

export default function FlipFlowExample() {
  return (
    <div className="w-full rounded-lg overflow-hidden border p-4">
      <FlipFlow data={data} />
    </div>
  );
}
