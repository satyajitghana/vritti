import ModelViewer from "./component";

export default function ModelViewerExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <ModelViewer url="/model.glb" />
    </div>
  );
}
