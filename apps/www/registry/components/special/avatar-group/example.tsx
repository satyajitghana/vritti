import { AvatarGroup } from "./component";

const avatars = [
  { imageUrl: "/basic-img.png", name: "Alice" },
  { imageUrl: "/basic-img.png", name: "Bob" },
  { imageUrl: "/basic-img.png", name: "Charlie" },
  { imageUrl: "/basic-img.png", name: "Diana" },
];

export default function AvatarGroupExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <AvatarGroup avatarUrls={avatars} />
    </div>
  );
}
