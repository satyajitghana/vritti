import { PixelImage } from "./component"

export default function PixelImageExample() {
  return (
    <PixelImage
      src="/placeholder.jpg"
      customGrid={{ rows: 4, cols: 6 }}
      grayscaleAnimation
    />
  )
}
