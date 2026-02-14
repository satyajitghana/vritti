import { RevealText } from "./component";

export default function RevealTextExample() {
  return (
    <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <RevealText
        mode="auto"
        direction="down"
        className="text-3xl font-bold"
        stagger={0.15}
      >
        Reveal text with direction
      </RevealText>
    </div>
  );
}
