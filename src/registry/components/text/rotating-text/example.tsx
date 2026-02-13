import RotatingText from "./component";

export default function RotatingTextExample() {
  return (
    <div className="flex items-center justify-center p-8 text-2xl">
      <RotatingText texts={["Hello", "World", "React", "Bits"]} />
    </div>
  );
}
