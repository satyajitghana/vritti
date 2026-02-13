"use client";

import {
  RelativeTime,
  RelativeTimeZone,
  RelativeTimeZoneDisplay,
  RelativeTimeZoneLabel,
} from "./component";

export default function RelativeTimeExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <RelativeTime className="w-full max-w-xs">
        <RelativeTimeZone zone="America/New_York">
          <RelativeTimeZoneLabel>EST</RelativeTimeZoneLabel>
          <RelativeTimeZoneDisplay />
        </RelativeTimeZone>
        <RelativeTimeZone zone="Europe/London">
          <RelativeTimeZoneLabel>GMT</RelativeTimeZoneLabel>
          <RelativeTimeZoneDisplay />
        </RelativeTimeZone>
        <RelativeTimeZone zone="Asia/Tokyo">
          <RelativeTimeZoneLabel>JST</RelativeTimeZoneLabel>
          <RelativeTimeZoneDisplay />
        </RelativeTimeZone>
      </RelativeTime>
    </div>
  );
}
