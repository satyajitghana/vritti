import FlowingMenu from "./component";

const menuItems = [
  { link: "#", text: "Home", image: "/assets/demo/cs1.webp" },
  { link: "#", text: "About", image: "/assets/demo/cs2.webp" },
  { link: "#", text: "Work", image: "/assets/demo/cs3.webp" },
  { link: "#", text: "Contact", image: "/assets/demo/poster.webp" },
];

export default function FlowingMenuExample() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border">
      <FlowingMenu items={menuItems} />
    </div>
  );
}
