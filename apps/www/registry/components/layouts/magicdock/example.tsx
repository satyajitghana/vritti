"use client"

import MagicDock from "./component";

export default function MagicDockExample() {
  const items = [
    { id: 1, icon: <span className="text-white text-xl">H</span>, label: "Home", onClick: () => {} },
    { id: 2, icon: <span className="text-white text-xl">S</span>, label: "Search", onClick: () => {} },
    { id: 3, icon: <span className="text-white text-xl">M</span>, label: "Messages", description: "3 new", onClick: () => {} },
    { id: 4, icon: <span className="text-white text-xl">P</span>, label: "Profile", onClick: () => {} },
    { id: 5, icon: <span className="text-white text-xl">C</span>, label: "Settings", onClick: () => {} },
  ];

  return (
    <div className="relative flex h-[200px] w-full items-end justify-center overflow-hidden rounded-lg border bg-gradient-to-b from-transparent to-black/20">
      <MagicDock items={items} variant="tooltip" />
    </div>
  );
}
