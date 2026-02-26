import TargetCursor from "./component";

export default function TargetCursorExample() {
  return (
    <div className="relative w-full h-[400px] bg-neutral-900 rounded-lg flex items-center justify-center">
      <TargetCursor />
      <p className="text-white/60 text-sm pointer-events-none select-none">Move your cursor here</p>
    </div>
  );
}
