import GlassSurface from "./component";

export default function GlassSurfaceExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
      <GlassSurface width={300} height={120} borderRadius={20}>
        <p className="text-sm font-medium text-white">Glass Surface Effect</p>
      </GlassSurface>
    </div>
  );
}
