import StaggeredMenu from "./component";

export default function StaggeredMenuExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <StaggeredMenu
        isFixed={false}
        items={[
          { label: "Home", ariaLabel: "Go to Home", link: "#" },
          { label: "About", ariaLabel: "Go to About", link: "#" },
          { label: "Work", ariaLabel: "Go to Work", link: "#" },
          { label: "Contact", ariaLabel: "Go to Contact", link: "#" },
        ]}
        socialItems={[
          { label: "Twitter", link: "#" },
          { label: "Github", link: "#" },
          { label: "LinkedIn", link: "#" },
        ]}
      />
    </div>
  );
}
