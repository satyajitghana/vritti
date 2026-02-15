import { InteractiveInput } from "./component";

export default function InteractiveInputExample() {
  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-black rounded-lg">
      <InteractiveInput placeholder="Type something..." />
      <InteractiveInput
        variant="glow"
        inputSize="lg"
        placeholder="Glowing input..."
        shimmerColor="#8b5cf6"
      />
    </div>
  );
}
