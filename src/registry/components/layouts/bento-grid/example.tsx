import { BentoCard, BentoGrid } from "./component";

const features = [
  {
    name: "Feature One",
    description: "Description for feature one.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50" />,
    Icon: () => <span>1</span>,
  },
  {
    name: "Feature Two",
    description: "Description for feature two.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50" />,
    Icon: () => <span>2</span>,
  },
];

export default function BentoGridExample() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
