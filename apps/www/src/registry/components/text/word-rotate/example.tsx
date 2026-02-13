import { WordRotate } from "./component";

export default function WordRotateExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <WordRotate
        className="text-4xl font-bold text-black dark:text-white"
        words={["Word", "Rotate"]}
      />
    </div>
  );
}
