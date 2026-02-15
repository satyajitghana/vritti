import { ElectricText } from "./component";

export default function ElectricTextExample() {
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-black">
      <ElectricText color="#5227FF" glowIntensity="high" className="text-4xl">
        ELECTRIC
      </ElectricText>
    </div>
  );
}
