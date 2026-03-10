import { CardTilt, CardTiltContent } from "./component";

export default function CardTiltExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <CardTilt tiltMaxAngle={15} scale={1.05}>
        <CardTiltContent className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white shadow-xl">
          <h3 className="text-xl font-bold">Card Tilt</h3>
          <p className="mt-2 text-sm text-white/80">
            Hover over this card to see the smooth tilt effect.
          </p>
        </CardTiltContent>
      </CardTilt>
    </div>
  );
}
