import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-base font-medium transition-colors duration-100 ease-out disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-accent-700 text-paper-0 hover:bg-accent-500",
        secondary:
          "border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-paper-0",
        ghost: "text-ink-900 hover:bg-paper-50",
        link: "text-ink-900 underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-6 has-[>svg]:px-5",
        sm: "h-9 px-4 text-sm has-[>svg]:px-3.5",
        lg: "h-13 px-8",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
