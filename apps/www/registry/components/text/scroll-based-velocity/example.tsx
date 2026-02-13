import { ScrollVelocityContainer, ScrollVelocityRow } from "./component";

export default function ScrollBasedVelocityExample() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden p-8">
      <ScrollVelocityContainer className="text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-[5rem]">
        <ScrollVelocityRow baseVelocity={20} direction={1}>
          Velocity Scroll
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={20} direction={-1}>
          Velocity Scroll
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
}
