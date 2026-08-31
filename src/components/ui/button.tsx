import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-[13px] font-semibold tracking-wide transition-all duration-300 ease-luxe focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-navy text-paper hover:bg-navy-mid shadow-soft hover:shadow-hard",
        accent:
          "bg-accent text-white hover:bg-accent-hot shadow-soft hover:shadow-hard-accent",
        outline:
          "border border-ink/12 bg-white text-ink hover:border-ink/25 hover:bg-paper-deep shadow-none hover:shadow-soft",
        "outline-light":
          "border border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/5",
        secondary: "bg-paper-deep text-ink hover:bg-paper-dim border border-ink/5",
        ghost: "text-ink hover:bg-ink/5",
        gold: "bg-accent text-white hover:bg-gold-soft shadow-glow hover:shadow-hard-accent",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
        link: "text-accent-deep underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 py-3 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
