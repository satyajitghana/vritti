import { AuroraText } from "./component";

export default function AuroraTextExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
        Ship <AuroraText>beautiful</AuroraText>
      </h1>
    </div>
  );
}
