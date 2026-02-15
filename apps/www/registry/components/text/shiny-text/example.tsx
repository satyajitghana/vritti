import ShinyText from "./component"

export default function ShinyTextExample() {
  return (
    <div className="relative flex items-center justify-center w-full h-[400px]">
      <span className="text-4xl font-semibold">
        <ShinyText
          text="Shiny Text Effect"
          speed={2}
          color="#b5b5b5"
          shineColor="#ffffff"
        />
      </span>
    </div>
  )
}
