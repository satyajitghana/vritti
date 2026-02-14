import LustreText from "./component";

export default function LustreTextExample() {
  return (
    <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg border bg-black">
      <LustreText text="Lustrous Text" className="text-5xl font-bold" speed={3} />
    </div>
  );
}
