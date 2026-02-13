import LogoLoop from "./component";

export default function LogoLoopExample() {
  return (
    <div className="w-full h-[100px]">
      <LogoLoop
        logos={[
          { src: "https://picsum.photos/seed/logo1/100/40", alt: "Logo 1" },
          { src: "https://picsum.photos/seed/logo2/100/40", alt: "Logo 2" },
          { src: "https://picsum.photos/seed/logo3/100/40", alt: "Logo 3" },
          { src: "https://picsum.photos/seed/logo4/100/40", alt: "Logo 4" },
        ]}
      />
    </div>
  );
}
