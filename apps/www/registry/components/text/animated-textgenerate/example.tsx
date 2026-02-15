import { AnimatedTextGenerate } from "./component";

export default function AnimatedTextGenerateExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <AnimatedTextGenerate
        text="Build beautiful user interfaces with animated text generation effects that reveal word by word"
        speed={0.5}
        blurEffect
        highlightWords={["beautiful", "animated"]}
        highlightClassName="text-blue-500 dark:text-blue-400"
      />
    </div>
  );
}
