"use client";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "./component";

const events = [
  {
    title: "Project Kickoff",
    description: "Initial planning and team alignment meeting.",
    time: "Jan 15, 2025",
  },
  {
    title: "Design Phase",
    description: "Wireframes and mockups created and approved.",
    time: "Feb 1, 2025",
  },
  {
    title: "Development Sprint 1",
    description: "Core features implementation begins.",
    time: "Mar 1, 2025",
  },
  {
    title: "Beta Launch",
    description: "Internal beta testing and feedback collection.",
    time: "Apr 15, 2025",
  },
];

export default function TimelineExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Timeline activeIndex={2}>
        {events.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineDot />
            <TimelineConnector />
            <TimelineContent>
              <TimelineHeader>
                <TimelineTitle>{event.title}</TimelineTitle>
                <TimelineDescription>{event.description}</TimelineDescription>
              </TimelineHeader>
              <TimelineTime>{event.time}</TimelineTime>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
