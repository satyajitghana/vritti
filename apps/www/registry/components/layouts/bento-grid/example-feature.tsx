import { BentoCard, BentoGrid } from "./component";

const features = [
  {
    name: "Analytics Dashboard",
    description: "Track your metrics with beautiful real-time charts and insights.",
    href: "#",
    cta: "View analytics",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-indigo-50 dark:from-violet-950 dark:to-indigo-950" />
    ),
    Icon: () => <span className="text-2xl">📊</span>,
  },
  {
    name: "Team Collaboration",
    description: "Work together in real-time with your team members.",
    href: "#",
    cta: "Invite team",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-950 dark:to-orange-950" />
    ),
    Icon: () => <span className="text-2xl">👥</span>,
  },
  {
    name: "API Integration",
    description: "Connect with 100+ services via our REST API.",
    href: "#",
    cta: "Read docs",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-950 dark:to-teal-950" />
    ),
    Icon: () => <span className="text-2xl">🔌</span>,
  },
  {
    name: "Enterprise Security",
    description: "SOC2 compliant with end-to-end encryption and SSO.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-50 dark:from-rose-950 dark:to-pink-950" />
    ),
    Icon: () => <span className="text-2xl">🔒</span>,
  },
];

export default function BentoGridFeatureExample() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
