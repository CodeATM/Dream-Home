import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-eyebrow",
  {
    variants: {
      variant: {
        default: "border-transparent bg-ink text-paper",
        accent: "border-accent/30 bg-accent/12 text-accent-deep",
        outline: "border-ink/20 bg-transparent text-ink",
        "outline-light": "border-white/25 bg-transparent text-white",
        secondary: "border-ink/8 bg-paper-deep text-ink",
        success: "border-emerald-200 bg-emerald-50 text-emerald-700",
        warning: "border-amber-200 bg-amber-50 text-amber-700",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
