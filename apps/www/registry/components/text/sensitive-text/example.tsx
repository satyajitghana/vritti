import SensitiveText from "./component";

export default function SensitiveTextExample() {
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <SensitiveText
        className="text-5xl font-bold"
        variant="compress"
        maxStretch={0.5}
        sensitivity={0.5}
      >
        Sensitive Text
      </SensitiveText>
    </div>
  );
}
