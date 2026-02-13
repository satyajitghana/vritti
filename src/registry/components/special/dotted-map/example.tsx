import { DottedMap } from "./component";

const markers = [
  { lat: 40.7128, lng: -74.006, size: 0.3 },
  { lat: 51.5074, lng: -0.1278, size: 0.3 },
  { lat: 35.6762, lng: 139.6503, size: 0.3 },
  { lat: -33.8688, lng: 151.2093, size: 0.3 },
  { lat: 48.8566, lng: 2.3522, size: 0.3 },
];

export default function DottedMapExample() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <DottedMap markers={markers} />
    </div>
  );
}
