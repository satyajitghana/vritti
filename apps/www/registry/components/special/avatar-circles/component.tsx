/* eslint-disable @next/next/no-img-element */
"use client"

import { cn } from "@/lib/utils"

interface Avatar {
  imageUrl: string
  profileUrl: string
}
interface AvatarCirclesProps {
  className?: string
  numPeople?: number
  avatarUrls: Avatar[]
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            key={index}
            className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
            src={url.imageUrl}
            width={40}
            height={40}
            alt={`Avatar ${index + 1}`}
            onError={(e) => {
              const colors = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];
              const bg = colors[index % colors.length];
              (e.target as HTMLImageElement).src =
                `data:image/svg+xml,${encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">` +
                    `<rect width="80" height="80" fill="${bg}"/>` +
                    `<circle cx="40" cy="30" r="14" fill="#fff" opacity="0.85"/>` +
                    `<ellipse cx="40" cy="72" rx="22" ry="20" fill="#fff" opacity="0.85"/>` +
                    `</svg>`
                )}`;
            }}
          />
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <a
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
          href=""
        >
          +{numPeople}
        </a>
      )}
    </div>
  )
}
