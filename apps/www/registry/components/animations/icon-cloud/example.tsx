import { IconCloud } from "./component"

const slugs = [
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "nextdotjs",
  "prisma",
  "postgresql",
  "firebase",
  "vercel",
  "docker",
  "git",
  "github",
  "figma",
]

export default function IconCloudExample() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  )

  return (
    <div className="relative flex h-[400px] w-full max-w-lg items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </div>
  )
}
