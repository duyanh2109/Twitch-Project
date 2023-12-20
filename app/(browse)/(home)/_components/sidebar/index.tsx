import React from "react";
import Wrapper from "./wrapper";
import Toggle, { ToggleSkeleton } from "./toggle";
import Recommended, { RecommendedSkeleton } from "./Recommended";
import { getRecommended } from "@/lib/recommended-service";
import { getFollowUser } from "@/lib/follow-service";
import Following, { FollowingSkeleton } from "./Following";

const Sidebar = async () => {
  const recommenedUser = await getRecommended();
  const following = await getFollowUser();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommenedUser} />
      </div>
    </Wrapper>
  );
};

export default Sidebar;

export const SideBarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
