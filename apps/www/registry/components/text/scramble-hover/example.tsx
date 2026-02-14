import ScrambleHover from "./component"

export default function ScrambleHoverExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <ScrambleHover
        text="Hover to Scramble"
        className="text-4xl font-bold cursor-pointer"
        scrambleSpeed={50}
        maxIterations={10}
      />
      <ScrambleHover
        text="Sequential Reveal"
        className="text-2xl font-semibold cursor-pointer"
        scrambledClassName="text-primary/40"
        sequential
        revealDirection="start"
        scrambleSpeed={60}
      />
    </div>
  )
}
