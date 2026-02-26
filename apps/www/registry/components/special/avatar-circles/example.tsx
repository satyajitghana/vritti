import { AvatarCircles } from "./component";

const avatars = [
  {
    imageUrl: "/basic-img.png",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "/basic-img.png",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "/basic-img.png",
    profileUrl: "https://github.com/BankkRoll",
  },
];

export default function AvatarCirclesExample() {
  return <AvatarCircles numPeople={99} avatarUrls={avatars} />;
}
