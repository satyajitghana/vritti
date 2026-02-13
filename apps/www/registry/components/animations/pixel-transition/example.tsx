import PixelTransition from "./component";

export default function PixelTransitionExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <PixelTransition
        firstContent={<div className="flex items-center justify-center w-full h-full bg-blue-500 text-white text-xl font-bold">First</div>}
        secondContent={<div className="flex items-center justify-center w-full h-full bg-purple-500 text-white text-xl font-bold">Second</div>}
        gridSize={7}
      />
    </div>
  );
}
