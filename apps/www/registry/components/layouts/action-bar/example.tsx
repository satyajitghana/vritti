"use client";

import { useState } from "react";
import {
  ActionBar,
  ActionBarClose,
  ActionBarGroup,
  ActionBarItem,
  ActionBarSelection,
  ActionBarSeparator,
} from "./component";

export default function ActionBarExample() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(3);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <button
        type="button"
        className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
        onClick={() => setOpen(!open)}
      >
        {open ? "Hide" : "Show"} Action Bar
      </button>

      <p className="text-sm text-muted-foreground">
        {selected} items selected
      </p>

      <ActionBar open={open} onOpenChange={setOpen}>
        <ActionBarSelection>
          {selected} selected
        </ActionBarSelection>
        <ActionBarSeparator />
        <ActionBarGroup>
          <ActionBarItem onSelect={() => alert("Archive action")}>
            Archive
          </ActionBarItem>
          <ActionBarItem onSelect={() => alert("Delete action")}>
            Delete
          </ActionBarItem>
          <ActionBarItem onSelect={() => alert("Move action")}>
            Move to
          </ActionBarItem>
        </ActionBarGroup>
        <ActionBarSeparator />
        <ActionBarClose aria-label="Dismiss">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </ActionBarClose>
      </ActionBar>
    </div>
  );
}
