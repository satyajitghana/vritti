import { AvatarStack } from "./component";

export default function AvatarStackExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <AvatarStack animate>
        <img
          alt="User 1"
          className="rounded-full"
          src="/basic-img.png"
        />
        <img
          alt="User 2"
          className="rounded-full"
          src="/basic-img.png"
        />
        <img
          alt="User 3"
          className="rounded-full"
          src="/basic-img.png"
        />
        <img
          alt="User 4"
          className="rounded-full"
          src="/basic-img.png"
        />
      </AvatarStack>
    </div>
  );
}
