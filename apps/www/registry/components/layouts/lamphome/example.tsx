"use client";
import { Lamphome } from "./component";
import { useState } from "react";

export default function LamphomeExample() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`h-[500px] w-full rounded-lg overflow-hidden border ${isDark ? "dark bg-black" : "bg-white"}`}>
      <Lamphome
        title="Welcome to Our Platform"
        description="Build modern web applications with beautiful UI components."
        navItems={[
          { href: "#", label: "Home" },
          { href: "#", label: "Docs" },
          { href: "#", label: "Blog" },
        ]}
        isDarkMode={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />
    </div>
  );
}
