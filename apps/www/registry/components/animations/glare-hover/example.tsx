import GlareHover from "./component";

export default function GlareHoverExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <GlareHover>
        <div className="p-6 text-lg font-semibold">Hover me</div>
      </GlareHover>
    </div>
  );
}
