import FlowingMenu from "./component";

const menuItems = [
  { link: "#", text: "Home", image: "https://picsum.photos/seed/menu1/600/400" },
  { link: "#", text: "About", image: "https://picsum.photos/seed/menu2/600/400" },
  { link: "#", text: "Work", image: "https://picsum.photos/seed/menu3/600/400" },
  { link: "#", text: "Contact", image: "https://picsum.photos/seed/menu4/600/400" },
];

export default function FlowingMenuExample() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border">
      <FlowingMenu items={menuItems} />
    </div>
  );
}
