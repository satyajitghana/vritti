import NavbarFlow, { HoverLink, FeatureItem } from "./component";

export default function NavbarFlowExample() {
  const links = [
    { text: "Home", url: "#" },
    {
      text: "Products",
      submenu: (
        <div>
          <FeatureItem heading="Analytics" url="#" info="Track your metrics" />
          <FeatureItem heading="Dashboard" url="#" info="Monitor everything" />
        </div>
      ),
    },
    { text: "About", url: "#" },
    { text: "Contact", url: "#" },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-lg border h-[200px]">
      <NavbarFlow
        emblem="Logo"
        links={links}
        rightComponent={<span className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-full">Sign Up</span>}
      />
    </div>
  );
}
