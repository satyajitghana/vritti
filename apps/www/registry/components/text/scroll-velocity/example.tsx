import ScrollVelocity from "./component"

export default function ScrollVelocityExample() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      <ScrollVelocity
        texts={["React Bits", "Scroll Down"]}
        velocity={100}
        className="custom-scroll-text"
      />
    </div>
  )
}
