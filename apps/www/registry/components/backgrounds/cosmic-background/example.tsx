import { CosmicBackground } from "./component";

export default function CosmicBackgroundExample() {
  return (
    <CosmicBackground variant="aurora" className="h-[400px] w-full rounded-lg border overflow-hidden">
      <div className="flex h-full items-center justify-center">
        <h2 className="text-3xl font-bold text-white">Cosmic Background</h2>
      </div>
    </CosmicBackground>
  );
}
