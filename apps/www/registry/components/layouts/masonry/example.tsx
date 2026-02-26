import Masonry from "./component";

const items = [
  { id: "1", img: "https://picsum.photos/seed/masonry1/400/300", url: "#", height: 300 },
  { id: "2", img: "https://picsum.photos/seed/masonry2/400/400", url: "#", height: 400 },
  { id: "3", img: "https://picsum.photos/seed/masonry3/400/350", url: "#", height: 350 },
  { id: "4", img: "https://picsum.photos/seed/masonry4/400/250", url: "#", height: 250 },
  { id: "5", img: "https://picsum.photos/seed/masonry5/400/300", url: "#", height: 300 },
  { id: "6", img: "https://picsum.photos/seed/masonry6/400/350", url: "#", height: 350 },
];

export default function MasonryExample() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border">
      <Masonry items={items} />
    </div>
  );
}
