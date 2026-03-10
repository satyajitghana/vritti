import SpotlightCard from "./component";

export default function SpotlightCardExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <SpotlightCard>
        <p className="text-center text-lg font-semibold">Spotlight Card</p>
      </SpotlightCard>
    </div>
  );
}
