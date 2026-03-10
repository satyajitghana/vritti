"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Settings,
  Users,
  BarChart3,
  Mail,
  ChevronLeft,
  ChevronRight,
  Layout,
  Bell,
  FolderOpen,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface SidebarDashboardProps {
  className?: string;
  defaultCollapsed?: boolean;
}

interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const defaultSections: NavSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", icon: Home, href: "#dashboard" },
      { label: "Analytics", icon: BarChart3, href: "#analytics" },
      { label: "Projects", icon: FolderOpen, href: "#projects", badge: "5" },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Team", icon: Users, href: "#team" },
      { label: "Messages", icon: Mail, href: "#messages", badge: "12" },
      { label: "Notifications", icon: Bell, href: "#notifications" },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Templates", icon: Layout, href: "#templates" },
      { label: "Settings", icon: Settings, href: "#settings" },
    ],
  },
];

export default function SidebarDashboard({
  className,
  defaultCollapsed = false,
}: SidebarDashboardProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
      className={cn(
        "flex h-[600px] flex-col border-r border-border bg-background",
        className
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-base font-semibold text-foreground"
          >
            Dashboard
          </motion.span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
            collapsed && "mx-auto"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {defaultSections.map((section) => (
          <div key={section.title} className="mb-4">
            {!collapsed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-1 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                {section.title}
              </motion.p>
            )}
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.label;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveItem(item.label);
                    }}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                      collapsed && "justify-center px-0"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 rounded-lg bg-accent"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.4,
                        }}
                      />
                    )}
                    <Icon className="relative z-10 h-4.5 w-4.5 shrink-0" />
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-10 truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}
                    {!collapsed && item.badge && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-10 ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Section */}
      <div className="border-t border-border p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2",
            collapsed && "justify-center px-0"
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            JD
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-1 items-center justify-between"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  John Doe
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  john@example.com
                </p>
              </div>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Log out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
