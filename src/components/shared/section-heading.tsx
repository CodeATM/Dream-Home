import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {(index || eyebrow) && (
        <p
          className={cn(
            "label-mono flex items-center gap-2.5",
            align === "center" && "justify-center",
            dark ? "text-gold-soft" : "text-accent"
          )}
        >
          {index && <span className="opacity-60">{index}</span>}
          {eyebrow && <span>{eyebrow}</span>}
          <span
            aria-hidden
            className={cn(
              "inline-block h-[1.5px] w-8 rounded-full",
              dark ? "bg-gold/40" : "bg-accent/40"
            )}
          />
        </p>
      )}
      <h2
        className={cn(
          "masthead mt-3 text-3xl sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-paper" : "text-navy"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            dark ? "text-paper/55" : "text-ink-dim"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
