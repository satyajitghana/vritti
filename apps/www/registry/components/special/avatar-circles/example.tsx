import { AvatarCircles } from "./component";

// Inline SVG data URIs for avatar placeholders — each has a distinct background
// color and a simple person silhouette so the component preview looks meaningful
// without depending on any external image service.
const makeSvgAvatar = (bg: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">` +
      `<rect width="80" height="80" fill="${bg}"/>` +
      `<circle cx="40" cy="30" r="14" fill="#fff" opacity="0.85"/>` +
      `<ellipse cx="40" cy="72" rx="22" ry="20" fill="#fff" opacity="0.85"/>` +
      `</svg>`
  )}`;

const avatars = [
  {
    imageUrl: makeSvgAvatar("#6366f1"),
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: makeSvgAvatar("#f59e0b"),
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: makeSvgAvatar("#10b981"),
    profileUrl: "https://github.com/BankkRoll",
  },
];

export default function AvatarCirclesExample() {
  return <AvatarCircles numPeople={99} avatarUrls={avatars} />;
}
