import StaggeredMenu from "./component";

export default function StaggeredMenuExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <StaggeredMenu isFixed={false} />
    </div>
  );
}
