'use client';

import { type ReactElement, Fragment, useEffect, useState } from 'react';
import { TerminalIcon } from 'lucide-react';

export function InstallAnimation() {
  const installCmd = 'npx vritti-ui add shimmer-button';
  const tickTime = 80;
  const timeCommandEnter = installCmd.length;
  const timeCommandRun = timeCommandEnter + 3;
  const timeCommandEnd = timeCommandRun + 4;
  const timeEnd = timeCommandEnd + 1;

  const [tick, setTick] = useState(timeEnd);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev >= timeEnd ? prev : prev + 1));
    }, tickTime);
    return () => clearInterval(timer);
  }, [timeEnd]);

  const lines: ReactElement[] = [];

  lines.push(
    <span key="prompt" className="text-brand">
      ${' '}
    </span>,
  );

  lines.push(
    <span key="command_type">
      {installCmd.substring(0, tick)}
      {tick < timeCommandEnter && (
        <span className="inline-block h-4 w-1.5 animate-blink-cursor bg-foreground" />
      )}
    </span>,
  );

  if (tick >= timeCommandEnter) {
    lines.push(<span key="space">{'\n'}</span>);
  }

  if (tick > timeCommandRun) {
    lines.push(
      <Fragment key="command_response">
        {tick > timeCommandRun + 1 && (
          <span className="text-muted-foreground">
            {'\n'}Installing shimmer-button...
          </span>
        )}
        {tick > timeCommandRun + 2 && (
          <span className="text-muted-foreground">
            {'\n'}Adding dependencies: motion, clsx, tailwind-merge
          </span>
        )}
        {tick > timeCommandRun + 3 && (
          <span className="text-brand">
            {'\n\n'}✓ Component shimmer-button added successfully!
          </span>
        )}
        {tick > timeCommandRun + 4 && (
          <span className="text-muted-foreground">
            {'\n'}→ components/ui/shimmer-button.tsx
          </span>
        )}
      </Fragment>,
    );
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => {
        if (tick >= timeEnd) setTick(0);
      }}
    >
      <pre className="overflow-hidden rounded-xl border text-sm shadow-lg bg-card">
        <div className="flex flex-row items-center gap-2 border-b px-4 py-2">
          <TerminalIcon className="size-4 text-muted-foreground" />
          <span className="font-medium text-sm">Terminal</span>
          <div className="grow" />
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-red-400/80" />
            <div className="size-3 rounded-full bg-yellow-400/80" />
            <div className="size-3 rounded-full bg-green-400/80" />
          </div>
        </div>
        <div className="min-h-[180px]">
          <code className="block whitespace-pre-wrap p-4 text-foreground">
            {lines}
          </code>
        </div>
      </pre>
    </div>
  );
}
