import { WarpBackground } from "./component";

export default function WarpBackgroundExample() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <WarpBackground
        perspective={200}
        beamsPerSide={4}
        beamSize={4}
        beamDuration={4}
        className="h-full"
      >
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
          <span className="text-foreground text-3xl font-bold">Warp Background</span>
          <p className="text-muted-foreground max-w-md">
            A 3D perspective grid with animated color beams
          </p>
        </div>
      </WarpBackground>
    </div>
  );
}
