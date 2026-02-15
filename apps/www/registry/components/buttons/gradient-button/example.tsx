import GradientButton from "./component"

export default function GradientButtonExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <GradientButton label="Emerald" variant="emerald" />
      <GradientButton label="Purple" variant="purple" />
      <GradientButton label="Orange" variant="orange" />
    </div>
  )
}
