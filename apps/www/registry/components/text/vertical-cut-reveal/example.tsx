import VerticalCutReveal from "./component"

export default function VerticalCutRevealExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.04}
        containerClassName="text-4xl font-bold"
      >
        Vertical Cut Reveal
      </VerticalCutReveal>
    </div>
  )
}
