import LiquidGlassCard from "./component"

export default function LiquidGlassCardExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <LiquidGlassCard className="gap-3.5 rounded-3xl border border-zinc-200/60 bg-gradient-to-br from-zinc-50 to-zinc-100 p-6 shadow-xl dark:border-zinc-700/60 dark:from-zinc-900 dark:to-black">
          <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">
            Glass Card
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            This card features Apple-style glassmorphism with liquid distortion
            effects and subtle inner shadows.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-zinc-200/60 px-3 py-1 text-xs dark:bg-zinc-700/60">
              Glass
            </span>
            <span className="rounded-full bg-zinc-200/60 px-3 py-1 text-xs dark:bg-zinc-700/60">
              Blur
            </span>
          </div>
        </LiquidGlassCard>
      </div>
    </div>
  )
}
