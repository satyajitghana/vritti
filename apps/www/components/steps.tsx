import { cn } from "@/lib/utils"

export function Steps({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("steps mt-6 w-auto border-l-2 border-border pl-6", className)}
      {...props}
    >
      {children}
    </div>
  )
}
