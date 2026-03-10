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

const colorThemes = {
  green: {
    label: "GitHub Green",
    block: [
      'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
      'data-[level="1"]:fill-[#9be9a8]',
      'data-[level="2"]:fill-[#40c463]',
      'data-[level="3"]:fill-[#30a14e]',
      'data-[level="4"]:fill-[#216e39]',
    ].join(" "),
  },
  blue: {
    label: "Ocean Blue",
    block: [
      'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
      'data-[level="1"]:fill-[#b3d9ff]',
      'data-[level="2"]:fill-[#66b3ff]',
      'data-[level="3"]:fill-[#3399ff]',
      'data-[level="4"]:fill-[#0066cc]',
    ].join(" "),
  },
  purple: {
    label: "Purple",
    block: [
      'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
      'data-[level="1"]:fill-[#d8b4fe]',
      'data-[level="2"]:fill-[#a855f7]',
      'data-[level="3"]:fill-[#7e22ce]',
      'data-[level="4"]:fill-[#581c87]',
    ].join(" "),
  },
  orange: {
    label: "Sunset Orange",
    block: [
      'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
      'data-[level="1"]:fill-[#fdba74]',
      'data-[level="2"]:fill-[#fb923c]',
      'data-[level="3"]:fill-[#ea580c]',
      'data-[level="4"]:fill-[#c2410c]',
    ].join(" "),
  },
} as const;

type ThemeKey = keyof typeof colorThemes;

export default function ContributionGraphExample() {
  return (
    <div className="flex flex-col gap-10 overflow-auto p-8">
      {(Object.keys(colorThemes) as ThemeKey[]).map((key) => {
        const theme = colorThemes[key];
        return (
          <div key={key} className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {theme.label}
            </h3>
            <ContributionGraph data={sampleData}>
              <ContributionGraphCalendar>
                {({ activity, dayIndex, weekIndex }) => (
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                    className={theme.block}
                  />
                )}
              </ContributionGraphCalendar>
              <ContributionGraphFooter>
                <ContributionGraphTotalCount />
                <ContributionGraphLegend>
                  {({ level }) => (
                    <svg height={12} width={12}>
                      <title>{`${level} contributions`}</title>
                      <rect
                        className={`stroke-[1px] stroke-border ${theme.block}`}
                        data-level={level}
                        height={12}
                        rx={2}
                        ry={2}
                        width={12}
                      />
                    </svg>
                  )}
                </ContributionGraphLegend>
              </ContributionGraphFooter>
            </ContributionGraph>
          </div>
        );
      })}
    </div>
  );
}
