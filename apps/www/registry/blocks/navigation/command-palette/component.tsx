"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  Search,
  Command,
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
  File,
  Settings,
  Users,
  BarChart3,
  Mail,
  Home,
  FolderOpen,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: LucideIcon;
  shortcut?: string;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  className?: string;
  items?: CommandItem[];
  defaultOpen?: boolean;
}

const defaultItems: CommandItem[] = [
  { id: "home", label: "Go to Home", category: "Navigation", icon: Home },
  {
    id: "dashboard",
    label: "Go to Dashboard",
    category: "Navigation",
    icon: BarChart3,
    shortcut: "G D",
  },
  {
    id: "projects",
    label: "Browse Projects",
    category: "Navigation",
    icon: FolderOpen,
  },
  {
    id: "new-file",
    label: "Create New File",
    category: "Actions",
    icon: File,
    shortcut: "N F",
  },
  {
    id: "invite",
    label: "Invite Team Member",
    category: "Actions",
    icon: Users,
  },
  {
    id: "compose",
    label: "Compose Message",
    category: "Actions",
    icon: Mail,
    shortcut: "C M",
  },
  {
    id: "settings",
    label: "Open Settings",
    category: "Settings",
    icon: Settings,
    shortcut: "G S",
  },
];

export default function CommandPalette({
  className,
  items = defaultItems,
  defaultOpen = false,
}: CommandPaletteProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const categories = Array.from(
    new Set(filtered.map((item) => item.category))
  );

  const flatFiltered = categories.flatMap((cat) =>
    filtered.filter((item) => item.category === cat)
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      if (!open) return;

      if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < flatFiltered.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : flatFiltered.length - 1
        );
      } else if (e.key === "Enter" && flatFiltered[selectedIndex]) {
        flatFiltered[selectedIndex].onSelect?.();
        setOpen(false);
      }
    },
    [open, flatFiltered, selectedIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <div className={cn("relative", className)}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <Search className="h-4 w-4" />
        <span>Search commands...</span>
        <kbd className="ml-4 inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      {/* Overlay + Dialog */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Search className="h-4.5 w-4.5 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto px-2 py-2">
                {flatFiltered.length === 0 && (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    No results found.
                  </p>
                )}

                {categories.map((category) => {
                  const categoryItems = filtered.filter(
                    (item) => item.category === category
                  );

                  return (
                    <div key={category} className="mb-2">
                      <p className="px-2 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {category}
                      </p>
                      {categoryItems.map((item) => {
                        const globalIndex = flatFiltered.indexOf(item);
                        const Icon = item.icon;
                        const isSelected = globalIndex === selectedIndex;

                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              item.onSelect?.();
                              setOpen(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                              isSelected
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground"
                            )}
                          >
                            <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className="flex-1">{item.label}</span>
                            {item.shortcut && (
                              <span className="text-xs text-muted-foreground">
                                {item.shortcut}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 border-t border-border px-4 py-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <kbd className="inline-flex h-5 w-5 items-center justify-center rounded border border-border bg-muted">
                    <ArrowUp className="h-3 w-3" />
                  </kbd>
                  <kbd className="inline-flex h-5 w-5 items-center justify-center rounded border border-border bg-muted">
                    <ArrowDown className="h-3 w-3" />
                  </kbd>
                  <span className="ml-1">Navigate</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <kbd className="inline-flex h-5 items-center justify-center rounded border border-border bg-muted px-1">
                    <CornerDownLeft className="h-3 w-3" />
                  </kbd>
                  <span className="ml-1">Select</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <kbd className="inline-flex h-5 items-center justify-center rounded border border-border bg-muted px-1.5 text-[10px]">
                    ESC
                  </kbd>
                  <span className="ml-1">Close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
