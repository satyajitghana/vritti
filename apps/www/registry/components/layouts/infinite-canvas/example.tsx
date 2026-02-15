import { InfiniteCanvas, Card } from "./component";

export default function InfiniteCanvasExample() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg border">
      <InfiniteCanvas className="w-full h-full bg-muted/30" cardWidth={200} cardHeight={150}>
        <Card className="bg-blue-500 rounded-lg p-4 text-white w-full h-full flex items-center justify-center">
          <p className="font-bold">Card A</p>
        </Card>
        <Card className="bg-purple-500 rounded-lg p-4 text-white w-full h-full flex items-center justify-center">
          <p className="font-bold">Card B</p>
        </Card>
        <Card className="bg-green-500 rounded-lg p-4 text-white w-full h-full flex items-center justify-center">
          <p className="font-bold">Card C</p>
        </Card>
        <Card className="bg-orange-500 rounded-lg p-4 text-white w-full h-full flex items-center justify-center">
          <p className="font-bold">Card D</p>
        </Card>
      </InfiniteCanvas>
    </div>
  );
}
