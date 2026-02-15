import { DotPattern } from './component';

export default function DotPatternLinearExample() {
  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
      <DotPattern
        width={24}
        height={24}
        cr={1.5}
        className="[mask-image:linear-gradient(to_bottom,white,transparent)] text-blue-400 dark:text-blue-600"
      />
      <div className="z-10 text-center">
        <h1 className="text-4xl font-bold">Linear Gradient Mask</h1>
        <p className="text-muted-foreground mt-2">
          Larger dots with a top-to-bottom fade
        </p>
      </div>
    </div>
  );
}
