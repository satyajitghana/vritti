"use client";

import DetailedUsageTable from "./component";

export default function DetailedUsageTableExample() {
  return (
    <DetailedUsageTable
      title="Resource Usage"
      description="Current billing period usage breakdown"
      resources={[
        { name: "API Requests", used: 8500, limit: 10000, unit: "req" },
        { name: "Storage", used: 3200, limit: 5000, unit: "MB" },
        { name: "Bandwidth", used: 45, limit: 100, unit: "GB" },
        { name: "Team Members", used: 8, limit: 10 },
        { name: "Projects", used: 19, limit: 20 },
      ]}
    />
  );
}
