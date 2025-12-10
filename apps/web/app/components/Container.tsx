import React from "react";
import { cn } from "../lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "max-w-6xl mx-auto px-2 md:py-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
