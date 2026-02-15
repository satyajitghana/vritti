import Particles from "./component"

export default function ParticlesExample() {
  return (
    <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden">
      <Particles
        particleColors={["#ffffff", "#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  )
}
