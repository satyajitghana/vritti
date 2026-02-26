import GradualBlurMemo from "./component";

export default function GradualBlurExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <div className="relative h-full w-full">
        <div className="flex h-full flex-col items-center justify-center gap-2 p-8">
          <h2 className="text-2xl font-bold">Gradual Blur Demo</h2>
          <p className="text-muted-foreground">Scroll down to see the blur effect at the bottom edge</p>
          <p className="mt-4 text-lg">This content sits behind the gradual blur overlay.</p>
          <p className="text-lg">The blur increases gradually toward the bottom.</p>
        </div>
        <GradualBlurMemo position="bottom" strength={3} height="8rem" />
      </div>
    </div>
  );
}
