import React from "react";
import { cn } from "@/lib/utils";

const GridEffect = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-[size:40px_40px]",

        "bg-[linear-gradient(45deg,transparent_49%,#d1d5db_49%,#d1d5db_51%,transparent_51%),linear-gradient(-45deg,transparent_49%,#d1d5db_49%,#d1d5db_51%,transparent_51%)]",

        "dark:bg-[linear-gradient(45deg,transparent_48%,#6b7280_48%,#6b7280_52%,transparent_52%),linear-gradient(-45deg,transparent_48%,#6b7280_48%,#6b7280_52%,transparent_52%)]",

        "opacity-40 dark:opacity-25",
        "transition-opacity duration-500",
        className
      )}
      style={{
        WebkitMaskImage:
          "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 75%)",
        maskImage:
          "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 75%)",
      }}
      {...props}
    />
  );
};

export default GridEffect;
