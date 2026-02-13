import { Globe } from "./component";

export default function GlobeExample() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border px-40 pt-8 pb-40 md:pb-60">
      <span className="pointer-events-none text-center text-4xl font-semibold">
        Globe
      </span>
      <Globe className="top-28" />
    </div>
  );
}
