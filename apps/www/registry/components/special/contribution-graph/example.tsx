"use client";

import type { Activity } from "./component";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "./component";

const generateData = (): Activity[] => {
  const data: Activity[] = [];
  const now = new Date();
  for (let i = 365; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const count = Math.floor(Math.random() * 10);
    const level = count === 0 ? 0 : Math.min(4, Math.ceil(count / 2.5));
    data.push({
      date: date.toISOString().split("T")[0],
      count,
      level,
    });
  }
  return data;
};

const sampleData = generateData();

export default function ContributionGraphExample() {
  return (
    <div className="flex items-center justify-center overflow-auto p-8">
      <ContributionGraph data={sampleData}>
        <ContributionGraphCalendar>
          {({ activity, dayIndex, weekIndex }) => (
            <ContributionGraphBlock
              activity={activity}
              dayIndex={dayIndex}
              weekIndex={weekIndex}
            />
          )}
        </ContributionGraphCalendar>
        <ContributionGraphFooter>
          <ContributionGraphTotalCount />
          <ContributionGraphLegend />
        </ContributionGraphFooter>
      </ContributionGraph>
    </div>
  );
}
