import EnhancedGlowingButton from "./component"

export default function GlowButtonExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <EnhancedGlowingButton
        href="#"
        text="Get Started"
        glowColor="#FFAA81"
        textColor="black"
        backgroundColor="#d1d1d1"
      />
    </div>
  )
}
