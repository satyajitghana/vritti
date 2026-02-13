import Masonry from "./component";

export default function MasonryExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <Masonry
        items={[
          { id: "1", img: "https://picsum.photos/seed/a/400/300", url: "#", height: 300 },
          { id: "2", img: "https://picsum.photos/seed/b/400/400", url: "#", height: 400 },
          { id: "3", img: "https://picsum.photos/seed/c/400/350", url: "#", height: 350 },
        ]}
      />
    </div>
  );
}
