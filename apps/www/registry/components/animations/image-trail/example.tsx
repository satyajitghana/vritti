import ImageTrail from "./component";

export default function ImageTrailExample() {
  return (
    <div className="w-full h-[400px] relative">
      <ImageTrail
        items={[
          "/assets/demo/cs1.webp",
          "/assets/demo/cs2.webp",
          "/assets/demo/cs3.webp",
          "/assets/demo/poster.webp",
          "/assets/demo/person.webp",
        ]}
        variant={1}
      />
      <p className="absolute inset-0 flex items-center justify-center text-sm text-zinc-400 pointer-events-none select-none">Move your cursor to reveal images</p>
    </div>
  );
}
