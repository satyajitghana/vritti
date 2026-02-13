import CardNav from "./component";

export default function CardNavExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <CardNav
        logo="/logo.svg"
        items={[
          {
            label: "Products",
            bgColor: "#f3f4f6",
            textColor: "#111827",
            links: [
              { label: "Features", href: "#", ariaLabel: "Features" },
              { label: "Pricing", href: "#", ariaLabel: "Pricing" },
            ],
          },
        ]}
      />
    </div>
  );
}
