import { AvatarGroup } from "./component";

const avatars = [
  { imageUrl: "https://i.pravatar.cc/150?img=1", name: "Alice" },
  { imageUrl: "https://i.pravatar.cc/150?img=2", name: "Bob" },
  { imageUrl: "https://i.pravatar.cc/150?img=3", name: "Charlie" },
  { imageUrl: "https://i.pravatar.cc/150?img=4", name: "Diana" },
];

export default function AvatarGroupExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <AvatarGroup avatarUrls={avatars} />
    </div>
  );
}
