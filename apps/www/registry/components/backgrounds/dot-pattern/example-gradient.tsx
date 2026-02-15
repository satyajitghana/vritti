import { DotPattern } from './component';

export default function DotPatternGradientExample() {
  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
      <DotPattern
        className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        glow
      />
      <div className="z-10 text-center">
        <h1 className="text-4xl font-bold">Radial Gradient Mask</h1>
        <p className="text-muted-foreground mt-2">
          Dots fade out in a radial gradient with glow effect
        </p>
      </div>
    </div>
  );
}
