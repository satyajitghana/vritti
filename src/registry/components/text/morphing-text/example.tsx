import { MorphingText } from "./component";

const texts = [
  "Hello",
  "Morphing",
  "Text",
  "Animation",
  "React",
  "Component",
];

export default function MorphingTextExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <MorphingText texts={texts} />
    </div>
  );
}
