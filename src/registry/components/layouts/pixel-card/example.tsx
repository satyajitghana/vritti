import PixelCard from "./component";

export default function PixelCardExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <PixelCard>
        <p className="text-center text-lg font-semibold">Pixel Card</p>
      </PixelCard>
    </div>
  );
}
