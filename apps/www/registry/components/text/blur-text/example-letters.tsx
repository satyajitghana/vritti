import BlurText from "./component";

export default function BlurTextLettersExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">animateBy: words (default)</p>
        <BlurText text="Animate by words" animateBy="words" className="text-2xl font-bold" />
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">animateBy: letters</p>
        <BlurText text="Animate by letters" animateBy="letters" delay={30} className="text-2xl font-bold" />
      </div>
    </div>
  );
}
