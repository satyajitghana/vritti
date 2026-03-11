import SquigglyArrow from "@/registry/components/special/squiggle-arrow/component"

export default function SquigglyArrowExample() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-8">
      <h3 className="text-lg font-semibold text-foreground">Arrow Variants</h3>

      <div className="grid w-full grid-cols-3 gap-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-muted-foreground">Wavy</p>
          <SquigglyArrow variant="wavy" width={150} height={60} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-muted-foreground">Bouncy</p>
          <SquigglyArrow variant="bouncy" width={150} height={60} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-muted-foreground">Smooth</p>
          <SquigglyArrow variant="smooth" width={150} height={60} />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground">Directions</h3>

      <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-muted-foreground">Right</p>
          <SquigglyArrow direction="right" width={100} height={50} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-muted-foreground">Left</p>
          <SquigglyArrow direction="left" width={100} height={50} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-muted-foreground">Up</p>
          <SquigglyArrow direction="up" width={100} height={50} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-muted-foreground">Down</p>
          <SquigglyArrow direction="down" width={100} height={50} />
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-4">
        <span className="text-sm text-muted-foreground">Check this out</span>
        <SquigglyArrow variant="bouncy" direction="right" width={80} height={40} className="text-primary" />
        <span className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground">New!</span>
      </div>
    </div>
  )
}
