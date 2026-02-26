import PixelCard from "./component";

export default function PixelCardExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <PixelCard variant="blue">
        <p className="text-center text-lg font-semibold text-zinc-800 dark:text-zinc-200 z-10 relative">Pixel Card</p>
      </PixelCard>
    </div>
  );
}
