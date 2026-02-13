import { LineShadowText } from "./component";

export default function LineShadowTextExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <h1 className="text-5xl font-semibold tracking-tighter leading-none sm:text-6xl md:text-7xl">
        Ship{" "}
        <LineShadowText className="italic" shadowColor="black">
          Fast
        </LineShadowText>
      </h1>
    </div>
  );
}
