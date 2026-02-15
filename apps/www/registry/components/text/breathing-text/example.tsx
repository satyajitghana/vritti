import BreathingText from "./component"

export default function BreathingTextExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <BreathingText
        className="text-4xl font-bold"
        fromFontVariationSettings="'wght' 100"
        toFontVariationSettings="'wght' 900"
        staggerDuration={0.1}
        staggerFrom="center"
      >
        Breathing Text
      </BreathingText>
    </div>
  )
}
