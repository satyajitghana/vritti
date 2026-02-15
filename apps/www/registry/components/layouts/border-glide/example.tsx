import {
  BorderGlide,
  BorderGlideCard,
  BorderGlideContent,
  BorderGlideHeader,
  BorderGlideTitle,
  BorderGlideDescription,
} from "./component";

export default function BorderGlideExample() {
  return (
    <div className="relative flex h-[300px] w-full max-w-md mx-auto items-center justify-center overflow-hidden rounded-lg border p-4">
      <BorderGlide borderColor="#3b82f6" autoPlayInterval={4000}>
        <BorderGlideCard>
          <BorderGlideHeader>
            <BorderGlideTitle>Card One</BorderGlideTitle>
            <BorderGlideDescription>First card with a moving border effect.</BorderGlideDescription>
          </BorderGlideHeader>
          <BorderGlideContent className="p-6">
            <p className="text-sm">Swipe or wait for auto-play to see the next card.</p>
          </BorderGlideContent>
        </BorderGlideCard>
        <BorderGlideCard>
          <BorderGlideHeader>
            <BorderGlideTitle>Card Two</BorderGlideTitle>
            <BorderGlideDescription>Second card with animated border.</BorderGlideDescription>
          </BorderGlideHeader>
          <BorderGlideContent className="p-6">
            <p className="text-sm">The border glides smoothly around the card.</p>
          </BorderGlideContent>
        </BorderGlideCard>
      </BorderGlide>
    </div>
  );
}
