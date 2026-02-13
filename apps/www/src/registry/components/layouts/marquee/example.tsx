import { Marquee } from "./component";

const items = [
  "Item One",
  "Item Two",
  "Item Three",
  "Item Four",
  "Item Five",
];

export default function MarqueeExample() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center justify-center rounded-xl border px-6 py-4"
          >
            {item}
          </div>
        ))}
      </Marquee>
    </div>
  );
}
