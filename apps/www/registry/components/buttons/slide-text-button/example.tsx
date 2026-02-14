import SlideTextButton from "./component"

export default function SlideTextButtonExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <SlideTextButton text="Hover Me" hoverText="Click Now!" />
      <SlideTextButton text="Ghost Style" variant="ghost" />
    </div>
  )
}
