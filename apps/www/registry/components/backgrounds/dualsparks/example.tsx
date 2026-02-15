import { DualSparks } from "./component";

export default function DualSparksExample() {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border">
      <DualSparks className="w-full h-full" sparkCount={20} ringsPerWave={3}>
        <div className="flex items-center justify-center h-full">
          <h2 className="text-3xl font-bold">Dual Sparks</h2>
        </div>
      </DualSparks>
    </div>
  );
}
