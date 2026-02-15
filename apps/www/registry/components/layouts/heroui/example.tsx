import HeroUI from "./component";

export default function HeroUIExample() {
  return (
    <div className="w-full rounded-lg overflow-hidden border">
      <HeroUI
        title="Your Product"
        subtitle="Build Something Amazing"
        badgeText="Now Available"
        primaryCTA="Get Started"
        secondaryCTA="Learn More"
        features={["Fast", "Customizable", "TypeScript", "Dark Mode"]}
      />
    </div>
  );
}
