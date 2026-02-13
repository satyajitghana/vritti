import Counter from "./component";

export default function CounterExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <Counter value={1234} />
    </div>
  );
}
