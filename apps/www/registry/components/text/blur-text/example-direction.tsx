import BlurText from "./component";

export default function BlurTextDirectionExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">direction: top</p>
        <BlurText text="Blur from top" direction="top" className="text-2xl font-bold" />
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">direction: bottom</p>
        <BlurText text="Blur from bottom" direction="bottom" className="text-2xl font-bold" />
      </div>
    </div>
  );
}
