import CardFlip from "./component"

export default function CardFlipExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <CardFlip
        title="Design Systems"
        subtitle="Explore the fundamentals"
        description="Dive deep into the world of modern UI/UX design."
        features={["UI/UX", "Modern Design", "Tailwind CSS", "Components"]}
      />
    </div>
  )
}
