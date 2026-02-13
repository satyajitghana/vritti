import ImageTrail from "./component";

export default function ImageTrailExample() {
  return (
    <div className="w-full h-[400px]">
      <ImageTrail
        items={[
          "https://picsum.photos/seed/1/300/300",
          "https://picsum.photos/seed/2/300/300",
          "https://picsum.photos/seed/3/300/300",
          "https://picsum.photos/seed/4/300/300",
          "https://picsum.photos/seed/5/300/300",
        ]}
        variant={1}
      />
    </div>
  );
}
