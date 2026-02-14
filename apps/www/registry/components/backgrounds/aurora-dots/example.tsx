import { AuroraDots } from "./component";

export default function AuroraDotsExample() {
  return (
    <div className="h-[400px] w-full rounded-lg border overflow-hidden bg-black">
      <AuroraDots particleColor="34, 211, 238" interactive>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-2xl font-bold text-white">Aurora Dots</h2>
        </div>
      </AuroraDots>
    </div>
  );
}
