import ParallaxCards from "./component";

export default function ParallaxCardsExample() {
  const cards = [
    {
      lightBg: "bg-blue-100",
      darkBg: "dark:bg-blue-900",
      content: <h2 className="text-3xl font-bold">First Section</h2>,
    },
    {
      lightBg: "bg-purple-100",
      darkBg: "dark:bg-purple-900",
      content: <h2 className="text-3xl font-bold">Second Section</h2>,
    },
    {
      lightBg: "bg-green-100",
      darkBg: "dark:bg-green-900",
      content: <h2 className="text-3xl font-bold">Third Section</h2>,
    },
  ];

  return (
    <div className="relative w-full overflow-auto rounded-lg border" style={{ height: "500px" }}>
      <ParallaxCards cards={cards} height="auto" />
    </div>
  );
}
