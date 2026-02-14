import VenomBeam from "./component";

export default function VenomBeamExample() {
  return (
    <VenomBeam className="rounded-lg border">
      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-bold">Venom Beam</h2>
        <p className="text-sm text-muted-foreground mt-2">Interactive particle canvas with trails</p>
      </div>
    </VenomBeam>
  );
}
