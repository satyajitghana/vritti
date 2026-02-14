import { Glass } from "./component";

export default function GlassRippleExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <Glass
        width={200}
        height={200}
        borderRadius={16}
        tintOpacity={0.15}
        blur={4}
        ripple
        className="flex items-center justify-center"
      >
        <p className="text-white text-center font-medium p-4">
          Click for ripple effect
        </p>
      </Glass>
    </div>
  );
}
