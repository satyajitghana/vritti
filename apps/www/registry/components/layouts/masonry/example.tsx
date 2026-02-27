import Masonry from "./component";

const items = [
  { id: "1", img: "/assets/demo/cs1.webp", url: "#", height: 300 },
  { id: "2", img: "/assets/demo/cs2.webp", url: "#", height: 400 },
  { id: "3", img: "/assets/demo/cs3.webp", url: "#", height: 350 },
  { id: "4", img: "/assets/demo/poster.webp", url: "#", height: 250 },
  { id: "5", img: "/assets/demo/person.webp", url: "#", height: 300 },
  { id: "6", img: "/assets/demo/grain.webp", url: "#", height: 350 },
];

export default function MasonryExample() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border">
      <Masonry items={items} />
    </div>
  );
}
