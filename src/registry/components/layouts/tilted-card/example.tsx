import TiltedCard from "./component";

export default function TiltedCardExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <TiltedCard imageSrc="https://picsum.photos/seed/tilted/400/300" altText="Example" />
    </div>
  );
}
