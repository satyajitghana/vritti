"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /**
   * The month to display in the calendar
   */
  month?: Date
  /**
   * Event handler for when month changes
   */
  onMonthChange?: (date: Date) => void
  /**
   * Selected date(s)
   */
  selected?: Date | Date[]
  /**
   * Event handler for when date is selected
   */
  onSelect?: (date: Date) => void
  /**
   * Disabled dates
   */
  disabled?: (date: Date) => boolean
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      month: monthProp,
      onMonthChange,
      selected,
      onSelect,
      disabled,
      ...props
    },
    ref
  ) => {
    const [currentMonth, setCurrentMonth] = React.useState<Date>(
      monthProp || new Date()
    )

    const handleMonthChange = React.useCallback(
      (newMonth: Date) => {
        setCurrentMonth(newMonth)
        onMonthChange?.(newMonth)
      },
      [onMonthChange]
    )

    const previousMonth = () => {
      const newMonth = new Date(currentMonth)
      newMonth.setMonth(newMonth.getMonth() - 1)
      handleMonthChange(newMonth)
    }

    const nextMonth = () => {
      const newMonth = new Date(currentMonth)
      newMonth.setMonth(newMonth.getMonth() + 1)
      handleMonthChange(newMonth)
    }

    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const isDateSelected = (date: Date): boolean => {
      if (!selected) return false
      if (Array.isArray(selected)) {
        return selected.some(
          (d) =>
            d.getFullYear() === date.getFullYear() &&
            d.getMonth() === date.getMonth() &&
            d.getDate() === date.getDate()
        )
      }
      return (
        selected.getFullYear() === date.getFullYear() &&
        selected.getMonth() === date.getMonth() &&
        selected.getDate() === date.getDate()
      )
    }

    const isDateDisabled = (date: Date): boolean => {
      if (!disabled) return false
      return disabled(date)
    }

    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth)
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const previousMonthDays = getDaysInMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    )
    const previousMonthLastDays = Array.from(
      { length: firstDayOfMonth },
      (_, i) => previousMonthDays - firstDayOfMonth + i + 1
    )

    const monthName = currentMonth.toLocaleString("default", {
      month: "long",
      year: "numeric",
    })

    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
      <div ref={ref} className={cn("p-3", className)} {...props}>
        <div className="space-y-4">
          {/* Header with month/year and navigation */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{monthName}</h2>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={previousMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={nextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-2">
            {dayLabels.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {/* Previous month's days */}
            {previousMonthLastDays.map((day, i) => (
              <button
                key={`prev-${i}`}
                disabled
                className="relative h-9 w-9 rounded-md p-0 text-sm text-muted-foreground opacity-50"
              >
                {day}
              </button>
            ))}

            {/* Current month's days */}
            {days.map((day) => {
              const date = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day
              )
              const isSelected = isDateSelected(date)
              const isDisabledDate = isDateDisabled(date)
              const isToday =
                date.toDateString() === new Date().toDateString()

              return (
                <button
                  key={`current-${day}`}
                  onClick={() => {
                    if (!isDisabledDate) {
                      onSelect?.(date)
                    }
                  }}
                  disabled={isDisabledDate}
                  className={cn(
                    "relative h-9 w-9 rounded-md p-0 text-sm font-normal transition-colors",
                    isSelected &&
                      "bg-primary text-primary-foreground hover:bg-primary focus:bg-primary",
                    !isSelected &&
                      "hover:bg-accent hover:text-accent-foreground",
                    isDisabledDate && "cursor-not-allowed opacity-50",
                    isToday &&
                      !isSelected &&
                      "bg-muted text-muted-foreground",
                    isDisabledDate && "pointer-events-none"
                  )}
                >
                  {day}
                </button>
              )
            })}

            {/* Next month's days */}
            {Array.from({
              length: 42 - (previousMonthLastDays.length + days.length),
            }).map((_, i) => (
              <button
                key={`next-${i}`}
                disabled
                className="relative h-9 w-9 rounded-md p-0 text-sm text-muted-foreground opacity-50"
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }
)
Calendar.displayName = "Calendar"

export { Calendar }
