"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
}

const defaultNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Deployment successful",
    description: "Your application has been deployed to production.",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    type: "info",
    title: "New team member",
    description: "Sarah Chen has joined the engineering team.",
    timestamp: "15 minutes ago",
  },
  {
    id: "3",
    type: "warning",
    title: "Storage limit approaching",
    description: "You have used 85% of your available storage.",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    type: "error",
    title: "Build failed",
    description: "The latest build failed due to a type error in auth.ts.",
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    type: "info",
    title: "Scheduled maintenance",
    description: "System maintenance is planned for March 15 at 2:00 AM UTC.",
    timestamp: "3 hours ago",
  },
];

const typeConfig: Record<
  NotificationType,
  { icon: LucideIcon; dotClass: string; iconClass: string }
> = {
  info: {
    icon: Info,
    dotClass: "bg-blue-500",
    iconClass: "text-blue-500",
  },
  success: {
    icon: CheckCircle,
    dotClass: "bg-emerald-500",
    iconClass: "text-emerald-500",
  },
  warning: {
    icon: AlertTriangle,
    dotClass: "bg-amber-500",
    iconClass: "text-amber-500",
  },
  error: {
    icon: XCircle,
    dotClass: "bg-red-500",
    iconClass: "text-red-500",
  },
};

export interface NotificationCardsProps {
  className?: string;
  initialNotifications?: Notification[];
}

export default function NotificationCards({
  className,
  initialNotifications = defaultNotifications,
}: NotificationCardsProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <section className={cn("px-4 py-16", className)}>
      <div className="mx-auto max-w-xl">
        <div className="mb-8">
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            Notifications
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            You have {notifications.length} notification
            {notifications.length !== 1 && "s"}.
          </p>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {notifications.map((notification) => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;

              return (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-background group relative flex items-start gap-4 rounded-xl border p-4 shadow-sm">
                    <div className="relative mt-0.5 shrink-0">
                      <Icon className={cn("h-5 w-5", config.iconClass)} />
                      <span
                        className={cn(
                          "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full",
                          config.dotClass
                        )}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-foreground text-sm font-semibold">
                        {notification.title}
                      </p>
                      <p className="text-muted-foreground mt-0.5 text-sm">
                        {notification.description}
                      </p>
                      <p className="text-muted-foreground mt-1.5 text-xs">
                        {notification.timestamp}
                      </p>
                    </div>

                    <button
                      onClick={() => dismiss(notification.id)}
                      className="text-muted-foreground hover:text-foreground shrink-0 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="Dismiss notification"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {notifications.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground py-12 text-center text-sm"
            >
              No notifications. You&apos;re all caught up!
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
