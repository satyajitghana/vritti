import { SocialOrbit } from "./component";

export default function SocialOrbitExample() {
  const icons = [
    { icon: <span className="text-lg">G</span>, orbitIndex: 0 },
    { icon: <span className="text-lg">X</span>, orbitIndex: 0 },
    { icon: <span className="text-lg">L</span>, orbitIndex: 1 },
    { icon: <span className="text-lg">D</span>, orbitIndex: 1 },
  ];

  return (
    <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <SocialOrbit
        icons={icons}
        text="ORBIT TEXT AROUND"
        size={400}
        orbitDuration={20}
      >
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl pointer-events-auto">
          S
        </div>
      </SocialOrbit>
    </div>
  );
}
