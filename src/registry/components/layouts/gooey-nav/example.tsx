import GooeyNav from "./component";

export default function GooeyNavExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <GooeyNav
        items={[
          { label: "Home", href: "#" },
          { label: "About", href: "#" },
          { label: "Contact", href: "#" },
        ]}
      />
    </div>
  );
}
