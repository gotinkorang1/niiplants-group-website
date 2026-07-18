import * as React from "react";

import { cn } from "@/lib/utils";

/** Standard page gutter/max-width per docs/03-design-system.md (1280px container, fluid gutters). */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto max-w-[1280px] px-5 sm:px-[5vw] xl:px-20", className)}
      {...props}
    />
  );
}
