import GradualBlurMemo from "./component";

export default function GradualBlurExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <GradualBlurMemo>
        <p className="text-lg">Content with gradual blur</p>
      </GradualBlurMemo>
    </div>
  );
}
