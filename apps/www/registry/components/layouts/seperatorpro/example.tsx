import { SeparatorPro } from "./component";

export default function SeparatorProExample() {
  return (
    <div className="flex flex-col items-center gap-8 p-8 w-full max-w-md mx-auto">
      <div className="w-full">
        <p className="text-sm text-muted-foreground mb-2">Default</p>
        <SeparatorPro />
      </div>
      <div className="w-full">
        <p className="text-sm text-muted-foreground mb-2">Dots</p>
        <SeparatorPro variant="dots" />
      </div>
      <div className="w-full">
        <p className="text-sm text-muted-foreground mb-2">Wave</p>
        <SeparatorPro variant="wave" />
      </div>
    </div>
  );
}
