import { AvatarStack } from "./component";

export default function AvatarStackExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <AvatarStack animate>
        <img
          alt="User 1"
          className="rounded-full"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
        />
        <img
          alt="User 2"
          className="rounded-full"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
        />
        <img
          alt="User 3"
          className="rounded-full"
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face"
        />
        <img
          alt="User 4"
          className="rounded-full"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face"
        />
      </AvatarStack>
    </div>
  );
}
