import CurvedLoop from "./component";

export default function CurvedLoopExample() {
  return (
    <div className="flex items-center justify-center p-8 w-full">
      <CurvedLoop marqueeText="Hello World " speed={2} />
    </div>
  );
}
