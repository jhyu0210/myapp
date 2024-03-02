import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const MaxWidthWrapper = ({
  classname,
  children,
}: {
  classname?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn("mzs-w-screen mx-auto w-full px-2.5 md:px-20", classname)}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
