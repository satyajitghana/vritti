import { OrbitingCircles } from "./component"

export default function OrbitingCirclesExample() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={40}>
        <span className="text-2xl">🚀</span>
        <span className="text-2xl">⭐</span>
        <span className="text-2xl">🌙</span>
        <span className="text-2xl">☀️</span>
        <span className="text-2xl">🪐</span>
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        <span className="text-xl">💫</span>
        <span className="text-xl">✨</span>
        <span className="text-xl">🌟</span>
        <span className="text-xl">⚡</span>
      </OrbitingCircles>
    </div>
  )
}
