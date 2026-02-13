import FallingText from "./component";

export default function FallingTextExample() {
  return (
    <div className="flex items-center justify-center p-8 w-full h-[400px]">
      <FallingText text="Hello World from Falling Text" trigger="auto" />
    </div>
  );
}
