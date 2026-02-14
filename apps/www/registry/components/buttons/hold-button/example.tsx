import HoldButton from "./component"

export default function HoldButtonExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <HoldButton variant="red" holdDuration={2000} />
      <HoldButton variant="blue" holdDuration={3000} />
      <HoldButton variant="green" holdDuration={2500} />
    </div>
  )
}
