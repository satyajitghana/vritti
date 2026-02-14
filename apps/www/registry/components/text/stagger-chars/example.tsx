import StaggerChars from "./component";

export default function StaggerCharsExample() {
  return (
    <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <StaggerChars
        text="HOVER ME"
        hoverText="ANIMATED"
        className="text-5xl font-bold"
        hoverClassName="text-blue-500"
        direction="alternate"
      />
    </div>
  );
}
