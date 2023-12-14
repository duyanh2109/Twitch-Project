"use client";
import { useSideBar } from "@/store/use-sidebar";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./Recommended";
interface WrapperProps {
  children: React.ReactNode;
}
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  const { collapsed } = useSideBar((state) => state);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return (
      <aside
        className={cn(
          "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border[#2D2E35] z-50"
        )}
      >
        <ToggleSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border[#2D2E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
