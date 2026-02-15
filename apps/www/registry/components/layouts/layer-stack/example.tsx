import { LayerStack, Card } from "./component";

export default function LayerStackExample() {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg border p-4">
      <LayerStack cardWidth={280} cardGap={16} stageHeight={300}>
        <Card className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white flex items-center justify-center">
          <p className="text-lg font-bold">Card 1</p>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 text-white flex items-center justify-center">
          <p className="text-lg font-bold">Card 2</p>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-700 p-6 text-white flex items-center justify-center">
          <p className="text-lg font-bold">Card 3</p>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-700 p-6 text-white flex items-center justify-center">
          <p className="text-lg font-bold">Card 4</p>
        </Card>
      </LayerStack>
    </div>
  );
}
