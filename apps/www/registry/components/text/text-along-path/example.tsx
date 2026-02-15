import TextAlongPath from "./component"

export default function TextAlongPathExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <TextAlongPath
          path="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
          text="Hello World - Text Along Path - "
          svgClassName="w-full h-auto text-foreground"
          viewBox="0 0 200 100"
          textClassName="text-xs"
          duration={6}
        />
      </div>
    </div>
  )
}
