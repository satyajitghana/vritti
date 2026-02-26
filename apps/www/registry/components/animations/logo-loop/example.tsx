import LogoLoop from "./component";

export default function LogoLoopExample() {
  return (
    <div className="w-full h-[100px]">
      <LogoLoop
        logos={[
          { src: "/basic-img.png", alt: "Logo 1" },
          { src: "/basic-img.png", alt: "Logo 2" },
          { src: "/basic-img.png", alt: "Logo 3" },
          { src: "/basic-img.png", alt: "Logo 4" },
        ]}
      />
    </div>
  );
}
