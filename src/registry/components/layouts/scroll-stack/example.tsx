import ScrollStack, { ScrollStackItem } from "./component";

export default function ScrollStackExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <ScrollStack>
        <ScrollStackItem>
          <div className="flex h-64 items-center justify-center rounded-lg bg-blue-500 text-white">Card 1</div>
        </ScrollStackItem>
        <ScrollStackItem>
          <div className="flex h-64 items-center justify-center rounded-lg bg-green-500 text-white">Card 2</div>
        </ScrollStackItem>
        <ScrollStackItem>
          <div className="flex h-64 items-center justify-center rounded-lg bg-red-500 text-white">Card 3</div>
        </ScrollStackItem>
      </ScrollStack>
    </div>
  );
}
