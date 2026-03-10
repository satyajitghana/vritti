"use client";

import { useTheme } from "next-themes";
import { ThemeSwitcher } from "./component";

export default function ThemeSwitcherExample() {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center justify-center p-8">
      <ThemeSwitcher defaultValue="system" onChange={(theme) => setTheme(theme)} />
    </div>
  );
}
