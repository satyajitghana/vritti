import CSSBox from "./component"

export default function CSSBoxExample() {
  return (
    <div className="flex items-center justify-center p-16">
      <CSSBox
        width={200}
        height={200}
        depth={200}
        faces={{
          front: (
            <div className="flex h-full w-full items-center justify-center bg-blue-500/80 text-white font-bold">
              Front
            </div>
          ),
          back: (
            <div className="flex h-full w-full items-center justify-center bg-red-500/80 text-white font-bold">
              Back
            </div>
          ),
          right: (
            <div className="flex h-full w-full items-center justify-center bg-green-500/80 text-white font-bold">
              Right
            </div>
          ),
          left: (
            <div className="flex h-full w-full items-center justify-center bg-yellow-500/80 text-white font-bold">
              Left
            </div>
          ),
          top: (
            <div className="flex h-full w-full items-center justify-center bg-purple-500/80 text-white font-bold">
              Top
            </div>
          ),
          bottom: (
            <div className="flex h-full w-full items-center justify-center bg-pink-500/80 text-white font-bold">
              Bottom
            </div>
          ),
        }}
      />
    </div>
  )
}
