import { ShimmerButton } from './component';

export default function ShimmerButtonColorsExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <ShimmerButton shimmerColor="#ffffff" background="rgba(0, 0, 0, 1)">
        Default
      </ShimmerButton>
      <ShimmerButton shimmerColor="#60a5fa" background="rgba(30, 64, 175, 1)">
        Blue
      </ShimmerButton>
      <ShimmerButton shimmerColor="#f472b6" background="rgba(157, 23, 77, 1)">
        Pink
      </ShimmerButton>
      <ShimmerButton shimmerColor="#a78bfa" background="rgba(91, 33, 182, 1)">
        Purple
      </ShimmerButton>
    </div>
  );
}
