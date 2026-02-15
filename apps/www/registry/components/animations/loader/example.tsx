import { Loader } from "./component";

export default function LoaderExample() {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex items-center gap-4">
        <Loader variant="default" size={24}>Loading...</Loader>
      </div>
      <div className="flex items-center gap-4">
        <Loader variant="cube" size={24}>Processing...</Loader>
      </div>
      <div className="flex items-center gap-4">
        <Loader variant="dual-ring" size={24}>Please wait...</Loader>
      </div>
      <div className="flex items-center gap-4">
        <Loader variant="magnetic-dots" size={32}>Syncing...</Loader>
      </div>
    </div>
  );
}
