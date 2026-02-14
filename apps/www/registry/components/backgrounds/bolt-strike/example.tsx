import { BoltStrike } from "./component";

export default function BoltStrikeExample() {
  return (
    <BoltStrike color="#7c3aed" intensity={1.5} className="h-[400px] w-full rounded-lg border bg-black">
      <div className="flex h-full items-center justify-center">
        <h2 className="text-3xl font-bold text-white">Bolt Strike</h2>
      </div>
    </BoltStrike>
  );
}
