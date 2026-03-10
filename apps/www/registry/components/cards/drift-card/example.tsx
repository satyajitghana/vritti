import DriftCard from "./component";

export default function DriftCardExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border p-8">
      <DriftCard className="w-80 h-60">
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-lg font-semibold">Drift Card</h3>
          <p className="text-sm text-muted-foreground text-center px-4">
            Move your cursor over the card to see it drift.
          </p>
        </div>
      </DriftCard>
    </div>
  );
}
