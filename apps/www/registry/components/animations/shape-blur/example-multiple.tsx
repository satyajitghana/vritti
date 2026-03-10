import ShapeBlur from "./component";

export default function ShapeBlurMultiple() {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div className="h-[250px] rounded-lg overflow-hidden border">
        <ShapeBlur variation={0} shapeSize={1.2} roundness={0.4} />
      </div>
      <div className="h-[250px] rounded-lg overflow-hidden border">
        <ShapeBlur variation={1} circleSize={0.4} circleEdge={0.6} />
      </div>
      <div className="h-[250px] rounded-lg overflow-hidden border">
        <ShapeBlur variation={2} circleSize={0.3} circleEdge={0.4} />
      </div>
      <div className="h-[250px] rounded-lg overflow-hidden border">
        <ShapeBlur variation={3} circleSize={0.35} circleEdge={0.5} />
      </div>
    </div>
  );
}
