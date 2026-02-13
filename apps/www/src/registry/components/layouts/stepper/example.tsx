import Stepper, { Step } from "./component";

export default function StepperExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <Stepper>
        <Step>Step 1 Content</Step>
        <Step>Step 2 Content</Step>
        <Step>Step 3 Content</Step>
      </Stepper>
    </div>
  );
}
