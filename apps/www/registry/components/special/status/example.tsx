import { Status } from "./component";

export default function StatusExample() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-8">
      <Status status="online" statusindicator>Online</Status>
      <Status status="offline" statusindicator>Offline</Status>
      <Status status="away" statusindicator>Away</Status>
      <Status status="busy" statusindicator>Busy</Status>
      <Status status="idle" statusindicator>Idle</Status>
      <Status status="pending" statusindicator>Pending</Status>
      <Status status="success" statusindicator>Success</Status>
      <Status status="error" statusindicator>Error</Status>
      <Status status="warning" statusindicator>Warning</Status>
      <Status status="info" statusindicator>Info</Status>
    </div>
  );
}
