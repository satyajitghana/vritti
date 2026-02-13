import { PixelImage } from "./component"

export default function PixelImageExample() {
  return (
    <PixelImage
      src="https://picsum.photos/400/300"
      customGrid={{ rows: 4, cols: 6 }}
      grayscaleAnimation
    />
  )
}
