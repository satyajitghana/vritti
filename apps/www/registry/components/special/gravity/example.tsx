import Gravity, { MatterBody } from "./component"

export default function GravityExample() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden border rounded-lg">
      <Gravity gravity={{ x: 0, y: 1 }}>
        <MatterBody
          x="20%"
          y="10%"
          matterBodyOptions={{ restitution: 0.5, friction: 0.1 }}
        >
          <div className="rounded-xl bg-primary px-6 py-3 text-primary-foreground font-bold">
            Drag me!
          </div>
        </MatterBody>
        <MatterBody
          x="50%"
          y="5%"
          bodyType="circle"
          matterBodyOptions={{ restitution: 0.8 }}
        >
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            Hi
          </div>
        </MatterBody>
        <MatterBody
          x="70%"
          y="15%"
          matterBodyOptions={{ restitution: 0.3 }}
        >
          <div className="rounded-lg bg-green-500 px-4 py-2 text-white font-semibold">
            Physics!
          </div>
        </MatterBody>
      </Gravity>
    </div>
  )
}
