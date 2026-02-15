import FollowCursor from "./component";

export default function FollowCursorExample() {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border">
      <FollowCursor
        colors={["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFBE0B", "#FB5607", "#8338EC"]}
        bgColor="rgba(26, 26, 38, 1)"
        thickness={3}
        pointCount={20}
      />
    </div>
  );
}
