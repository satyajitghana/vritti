import StickerPeel from "./component";

export default function StickerPeelExample() {
  return (
    <div className="relative flex items-center justify-center p-8 h-[400px] w-full overflow-hidden">
      <StickerPeel imageSrc="https://picsum.photos/seed/sticker/400/400" />
    </div>
  );
}
