import BounceCards from "./component";

const images = [
  "https://picsum.photos/seed/bounce1/400/400",
  "https://picsum.photos/seed/bounce2/400/400",
  "https://picsum.photos/seed/bounce3/400/400",
  "https://picsum.photos/seed/bounce4/400/400",
  "https://picsum.photos/seed/bounce5/400/400",
];

export default function BounceCardsExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <BounceCards
        images={images}
        containerWidth={500}
        containerHeight={350}
        animationDelay={0.5}
        animationStagger={0.06}
        easeType="elastic.out(1, 0.8)"
        transformStyles={[
          "rotate(10deg) translate(-170px)",
          "rotate(5deg) translate(-85px)",
          "rotate(-3deg)",
          "rotate(-10deg) translate(85px)",
          "rotate(2deg) translate(170px)",
        ]}
      />
    </div>
  );
}
