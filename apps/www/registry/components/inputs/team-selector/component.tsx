"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";

const MAX_TEAM_SIZE = 4;

type TeamMember = {
  id: string;
  avatarUrl: string;
  name: string;
};

const AVATAR_COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444"];

function generateAvatarSvg(initials: string, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="48" fill="${color}"/><text x="48" y="48" dy=".35em" text-anchor="middle" fill="white" font-family="system-ui,sans-serif" font-size="36" font-weight="600">${initials}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-1",
    avatarUrl: generateAvatarSvg("T1", AVATAR_COLORS[0]),
    name: "Team Member 1",
  },
  {
    id: "member-2",
    avatarUrl: generateAvatarSvg("T2", AVATAR_COLORS[1]),
    name: "Team Member 2",
  },
  {
    id: "member-3",
    avatarUrl: generateAvatarSvg("T3", AVATAR_COLORS[2]),
    name: "Team Member 3",
  },
  {
    id: "member-4",
    avatarUrl: generateAvatarSvg("T4", AVATAR_COLORS[3]),
    name: "Team Member 4",
  },
];

const animations = {
  container: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  } satisfies Variants,
  avatar: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
  } satisfies Variants,
  vibration: {
    initial: { x: 0 },
    animate: { x: [-5, 5, -5, 5, 0] as const, transition: { duration: 0.3 } },
  } satisfies Variants,
  number: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 25 } },
  } satisfies Variants,
} as const;

interface TeamSelectorProps {
  defaultValue?: number;
  onChange?: (size: number) => void;
  className?: string;
}

export default function TeamSelector({
  defaultValue = 1,
  onChange,
  className = "",
}: TeamSelectorProps) {
  const [peopleCount, setPeopleCount] = useState(defaultValue);
  const [isVibrating, setIsVibrating] = useState(false);

  const handleIncrement = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (peopleCount < MAX_TEAM_SIZE) {
      const newCount = peopleCount + 1;
      setPeopleCount(newCount);
      onChange?.(newCount);
    } else {
      triggerVibration();
    }
  };

  const handleDecrement = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (peopleCount > 1) {
      const newCount = peopleCount - 1;
      setPeopleCount(newCount);
      onChange?.(newCount);
    } else {
      triggerVibration();
    }
  };

  const triggerVibration = () => {
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 300);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    action: "increment" | "decrement"
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action === "increment" ? handleIncrement(e) : handleDecrement(e);
    }
  };

  const renderAvatars = () =>
    TEAM_MEMBERS.slice(0, peopleCount).map((member, index) => (
      <motion.div
        animate="animate"
        className="flex items-center justify-center overflow-hidden rounded-full"
        exit="exit"
        initial="initial"
        key={member.id}
        style={{
          zIndex: peopleCount - index,
          marginLeft: index === 0 ? 0 : -24,
        }}
        variants={animations.avatar}
      >
        <img
          alt={member.name}
          className="rounded-full border border-white/10 bg-gradient-to-b from-white/5 to-white/20 object-cover shadow-lg backdrop-blur-sm transition-all duration-300 dark:border-white/5 dark:from-white/5 dark:to-black/20 w-24 h-24"
          height={96}
          src={member.avatarUrl}
          width={96}
        />
      </motion.div>
    ));

  return (
    <motion.div
      animate="animate"
      className={`flex w-full flex-col items-center justify-center gap-8 ${className}`}
      exit="exit"
      initial="initial"
      variants={animations.container}
    >
      <fieldset className="w-full">
        <legend className="sr-only">Team size selector</legend>
        <div className="relative flex h-24 w-full justify-center">
          <AnimatePresence mode="popLayout">{renderAvatars()}</AnimatePresence>
        </div>

        <motion.div
          animate={isVibrating ? "animate" : "initial"}
          className="mt-8 flex items-center justify-center gap-8"
          initial="initial"
          variants={isVibrating ? animations.vibration : undefined}
        >
          <button
            aria-label="Decrease team size"
            className="h-12 w-12 rounded-full border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50 text-zinc-900 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700/80 dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-100"
            disabled={peopleCount <= 1}
            onClick={handleDecrement}
            onKeyDown={(e) => handleKeyDown(e, "decrement")}
            type="button"
          >
            <span className="select-none font-medium text-2xl">-</span>
          </button>

          <motion.output
            animate="animate"
            aria-label={`Current team size: ${peopleCount}`}
            className="select-none bg-gradient-to-b from-zinc-800 to-zinc-600 bg-clip-text font-medium text-2xl text-transparent dark:from-zinc-200 dark:to-zinc-400"
            initial="initial"
            key={peopleCount}
            variants={animations.number}
          >
            {peopleCount}
          </motion.output>

          <button
            aria-label="Increase team size"
            className="h-12 w-12 rounded-full border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50 text-zinc-900 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700/80 dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-100"
            disabled={peopleCount >= MAX_TEAM_SIZE}
            onClick={handleIncrement}
            onKeyDown={(e) => handleKeyDown(e, "increment")}
            type="button"
          >
            <span className="select-none font-medium text-2xl">+</span>
          </button>
        </motion.div>
      </fieldset>
    </motion.div>
  );
}
