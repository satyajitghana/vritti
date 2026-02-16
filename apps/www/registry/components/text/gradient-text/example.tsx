import GradientText from "./component"

export default function GradientTextExample() {
  return (
    <div className="relative flex items-center justify-center w-full h-[400px]">
      <span className="text-5xl font-bold">
        <GradientText
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          animationSpeed={8}
          direction="horizontal"
          showBorder={false}
        >
          Gradient Magic
        </GradientText>
      </span>
    </div>
  )
}
