"use client";
import { cn } from "@/lib/utils";
import { useSideBar } from "@/store/use-sidebar";
import React, { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
  children: React.ReactNode;
}
const container = ({ children }: ContainerProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { collapsed, onCollapse, onExpand } = useSideBar((state) => state);
  useEffect(() => {
    if (matches) {
      onCollapse();
    } else{
        onExpand();
    }
  }, [matches]);
  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};

export default container;
