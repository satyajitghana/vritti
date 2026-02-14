import { AvatarStack } from "./component";

export default function AvatarStackExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <AvatarStack animate>
        <img
          alt="User 1"
          className="rounded-full"
          src="https://i.pravatar.cc/40?img=1"
        />
        <img
          alt="User 2"
          className="rounded-full"
          src="https://i.pravatar.cc/40?img=2"
        />
        <img
          alt="User 3"
          className="rounded-full"
          src="https://i.pravatar.cc/40?img=3"
        />
        <img
          alt="User 4"
          className="rounded-full"
          src="https://i.pravatar.cc/40?img=4"
        />
      </AvatarStack>
    </div>
  );
}
