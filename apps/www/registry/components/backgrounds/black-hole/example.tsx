import BlackHole from './component';

export default function BlackHoleExample() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-lg bg-black">
      <BlackHole
        innerColor="#ff8080"
        outerColor="#3633ff"
        quality="medium"
        rotationSpeed={0.3}
        orbitSpeed={1.0}
      />

      {/* Optional: Add content overlay to demonstrate usage */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white/90 backdrop-blur-sm bg-black/20 p-8 rounded-lg">
          <h1 className="text-4xl font-bold mb-2">Black Hole</h1>
          <p className="text-lg text-white/70">WebGL gravitational lensing effect</p>
        </div>
      </div>
    </div>
  );
}
