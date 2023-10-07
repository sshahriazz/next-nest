import React, { CSSProperties, ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: "row" | "column";
  justify?: "start" | "end" | "center" | "between" | "around";
  align?: "start" | "end" | "center" | "stretch";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: string;
  className?: string;
  style?: CSSProperties;
}

export function Flex({
  children,
  direction = "row",
  justify = "start",
  align = "start",
  wrap = "nowrap",
  gap = "0",
  className,
  style,
  ...rest
}: FlexProps) {
  const justifyContentMap = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
  };

  const alignItemsMap = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    stretch: "items-stretch",
  };

  const flexWrapMap = {
    nowrap: "flex-nowrap",
    wrap: "flex-wrap",
    "wrap-reverse": "flex-wrap-reverse",
  };

  return (
    <div
      className={clsx(
        "flex",
        justifyContentMap[justify],
        alignItemsMap[align],
        flexWrapMap[wrap],
        className,
        gap && `gap-${gap}`
      )}
      style={{
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

interface FlexItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  grow?: number;
  shrink?: number;
  basis?: string;
  className?: string;
  style?: CSSProperties;
}

export function FlexItem({
  children,
  grow = 0,
  shrink = 1,
  basis = "auto",
  className,
  style,
  ...rest
}: FlexItemProps) {
  return (
    <div
      className={clsx(
        "flex",
        `flex-grow-${grow}`,
        `flex-shrink-${shrink}`,
        className
      )}
      style={{ flexBasis: basis, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
