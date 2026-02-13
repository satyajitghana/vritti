import { NumberTicker } from "./component";

export default function NumberTickerExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <NumberTicker
        value={100}
        className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
      />
    </div>
  );
}
