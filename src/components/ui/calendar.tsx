"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("border border-transparent bg-white p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center font-mono text-xs uppercase tracking-widest",
        caption_label: "text-sm font-bold",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-paper-deep"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-ink-dim w-9 font-mono text-[10px] uppercase tracking-wider",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 first:[&:has([aria-selected])]:rounded-none"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 rounded-none p-0 font-mono text-xs aria-selected:opacity-100 hover:border hover:border-ink/40"
        ),
        day_selected:
          "rounded-xl bg-accent font-medium text-white hover:bg-accent hover:text-white focus:bg-accent focus:text-white",
        day_today: "bg-paper-deep font-bold underline decoration-accent decoration-2",
        day_outside: "day-outside opacity-30 text-ink-dim",
        day_disabled: "text-ink-dim line-through opacity-30",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
