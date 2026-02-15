import GridBackground from "./component";

export default function GridBackgroundExample() {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border">
      <GridBackground className="h-full">
        <h1 className="text-4xl font-bold">Grid Background</h1>
        <p className="text-muted-foreground mt-2">Perspective grid with converging lines</p>
      </GridBackground>
    </div>
  );
}
