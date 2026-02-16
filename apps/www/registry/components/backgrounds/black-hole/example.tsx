import BlackHole from './component';

export default function BlackHoleExample() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-lg border border-zinc-800 bg-black">
      <BlackHole
        innerColor="#ff8080"
        outerColor="#3633ff"
        quality="medium"
        rotationSpeed={0.3}
        orbitSpeed={1.0}
      />

      {/* Minimal overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-2">
          <h2 className="text-5xl font-bold text-white tracking-tight">
            Gravitational Lensing
          </h2>
          <p className="text-zinc-400 text-sm">
            Physics-based black hole effect with chromatic aberration
          </p>
        </div>
      </div>
    </div>
  );
}
