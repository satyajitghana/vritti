import Letter3DSwap from "./component"

export default function Letter3DSwapExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <Letter3DSwap
        mainClassName="text-4xl font-bold cursor-pointer"
        frontFaceClassName="text-foreground"
        secondFaceClassName="text-primary"
        staggerFrom="first"
        staggerDuration={0.03}
        rotateDirection="top"
      >
        Hover Over Me
      </Letter3DSwap>
    </div>
  )
}
