import CardSwap, { Card } from "./component";

export default function CardSwapExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <CardSwap>
        <Card className="flex items-center justify-center bg-blue-500 text-white">Card 1</Card>
        <Card className="flex items-center justify-center bg-green-500 text-white">Card 2</Card>
        <Card className="flex items-center justify-center bg-red-500 text-white">Card 3</Card>
      </CardSwap>
    </div>
  );
}
