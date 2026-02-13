import Stack from "./component";

export default function StackExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <Stack
        cards={[
          <div key="1" className="flex h-48 w-48 items-center justify-center rounded-lg bg-blue-500 text-white">Card 1</div>,
          <div key="2" className="flex h-48 w-48 items-center justify-center rounded-lg bg-green-500 text-white">Card 2</div>,
          <div key="3" className="flex h-48 w-48 items-center justify-center rounded-lg bg-red-500 text-white">Card 3</div>,
        ]}
      />
    </div>
  );
}
