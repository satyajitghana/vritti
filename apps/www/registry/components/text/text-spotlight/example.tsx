import { TextSpotlight } from "./component";

export default function TextSpotlightExample() {
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <TextSpotlight
        text="Move your cursor to reveal this text with a spotlight effect"
        textClassName="text-2xl font-bold max-w-md"
        spotlightSize={300}
      />
    </div>
  );
}
