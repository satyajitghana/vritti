import { Announcement, AnnouncementTag, AnnouncementTitle } from "./component";
import { Sparkles } from "lucide-react";

export default function AnnouncementExample() {
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <Announcement icon={<Sparkles className="size-4" />}>
        <AnnouncementTag>New</AnnouncementTag>
        <AnnouncementTitle>Introducing ScrollX UI Components</AnnouncementTitle>
      </Announcement>

      <Announcement movingBorder>
        <AnnouncementTag>Update</AnnouncementTag>
        <AnnouncementTitle>Moving border announcement</AnnouncementTitle>
      </Announcement>
    </div>
  );
}
