import { Stream, User } from "@prisma/client";
import React from "react";
interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}
const StreamPlayer = ({ user, stream }: StreamPlayerProps) => {
  return <div>StreamPlayer</div>;
};

export default StreamPlayer;
