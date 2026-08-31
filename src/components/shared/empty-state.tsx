import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-ink/10 bg-white px-6 py-20 text-center",
        className
      )}
    >
      {icon && (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/5 text-ink-dim">
          {icon}
        </div>
      )}
      <h3 className="font-heading text-xl font-bold text-navy">{title}</h3>
      {description && (
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-dim">
          {description}
        </p>
      )}
      {(actionHref || onAction) && actionLabel && (
        <button
          onClick={onAction}
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-navy px-6 text-[13px] font-semibold tracking-wide text-paper transition-colors duration-300 hover:bg-navy-mid"
          {...(actionHref ? {} : { type: "button" })}
        >
          {actionHref ? (
            <Link href={actionHref} className="flex items-center gap-2">
              {actionLabel}
            </Link>
          ) : (
            actionLabel
          )}
        </button>
      )}
    </div>
  );
}
