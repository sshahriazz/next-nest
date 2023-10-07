import React from "react";
import clsx from "clsx";

type GridProps = {
  children: React.ReactNode;
  className?: string;
};

type GridItemProps = {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
};

export const Grid = ({ children, className }: GridProps) => (
  <div className={clsx("grid", className)}>{children}</div>
);

export const GridItem = ({
  children,
  className,
  colSpan,
  rowSpan,
}: GridItemProps) => (
  <div
    className={clsx(
      colSpan && `col-span-${colSpan}`,
      rowSpan && `row-span-${rowSpan}`,
      className
    )}
  >
    {children}
  </div>
);
