import { GridPattern } from './component';

export default function GridPatternExample() {
  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
      <GridPattern className="text-neutral-300 dark:text-neutral-700" />
      <div className="z-10 text-center">
        <h1 className="text-4xl font-bold">Grid Pattern Background</h1>
        <p className="text-muted-foreground mt-2">
          A clean grid pattern for your backgrounds
        </p>
      </div>
    </div>
  );
}
