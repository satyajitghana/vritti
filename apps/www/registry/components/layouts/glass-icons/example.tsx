import GlassIcons from "./component";

export default function GlassIconsExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <GlassIcons
        items={[
          { icon: <span>A</span>, color: "blue", label: "Alpha" },
          { icon: <span>B</span>, color: "green", label: "Beta" },
          { icon: <span>C</span>, color: "red", label: "Gamma" },
        ]}
      />
    </div>
  );
}
