import { StreamPlayerSkeleton } from "@/components/StreamPlayer";
import React from "react";

const CreatorLoading = () => {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
};

export default CreatorLoading;
