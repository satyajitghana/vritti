import { SlideText } from "./component";

export default function SlideTextExample() {
  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <SlideText text="Hello World" className="text-4xl font-bold" />
      <SlideText
        text="Slide Animation"
        className="text-2xl font-medium"
        staggerDelay={0.05}
        pauseDuration={2}
      />
    </div>
  );
}
