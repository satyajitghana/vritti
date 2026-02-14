"use client";

import { ThemeSwitcher } from "./component";

export default function ThemeSwitcherExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <ThemeSwitcher defaultValue="system" />
    </div>
  );
}
