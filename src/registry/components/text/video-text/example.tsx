import { VideoText } from "./component";

export default function VideoTextExample() {
  return (
    <div className="relative flex items-center justify-center p-8 h-[200px] w-full overflow-hidden">
      <VideoText src="https://cdn.magicui.design/ocean-small.webm">
        OCEAN
      </VideoText>
    </div>
  );
}
