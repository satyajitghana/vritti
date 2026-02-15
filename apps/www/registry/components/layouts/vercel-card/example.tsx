import { VercelCard } from "./component";

export default function VercelCardExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border p-12">
      <VercelCard animateOnHover glowEffect className="max-w-sm">
        <h3 className="text-xl font-bold text-center">Vercel Card</h3>
        <p className="mt-2 text-sm text-muted-foreground text-center">
          A Vercel-inspired interactive card with corner icons and glow effect on hover.
        </p>
      </VercelCard>
    </div>
  );
}
