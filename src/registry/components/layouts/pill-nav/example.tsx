import PillNav from "./component";

export default function PillNavExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <PillNav
        logo="/logo.svg"
        items={[
          { label: "Home", href: "#" },
          { label: "About", href: "#" },
          { label: "Contact", href: "#" },
        ]}
      />
    </div>
  );
}
