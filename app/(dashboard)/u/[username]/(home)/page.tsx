import StreamPlayer from "@/components/stream-player";
import { getUserByUserName } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs";
import React from "react";
interface CreatorPageProps {
  params: {
    username: string;
  };
}
const CreatorPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUserName(params.username);
  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized access");
  }
  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
    </div>
  );
};

export default CreatorPage;
