import { ShimmerButton } from './component';

export default function ShimmerButtonSizesExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <ShimmerButton className="text-xs px-4 py-2" shimmerSize="0.03em">
        Small
      </ShimmerButton>
      <ShimmerButton className="text-sm px-6 py-3">
        Medium
      </ShimmerButton>
      <ShimmerButton className="text-lg px-8 py-4" shimmerSize="0.08em">
        Large
      </ShimmerButton>
    </div>
  );
}
