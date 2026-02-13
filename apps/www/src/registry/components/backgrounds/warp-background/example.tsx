import { WarpBackground } from "./component";

export default function WarpBackgroundExample() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border">
      <WarpBackground>
        <span className="text-white text-2xl font-bold">Warp Background</span>
      </WarpBackground>
    </div>
  );
}
