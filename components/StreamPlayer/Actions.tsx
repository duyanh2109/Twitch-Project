"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { onFollow, onUnFollow } from "@/actions/follow";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
interface ActionsProps {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
}
const Actions = ({ isFollowing, hostIdentity, isHost }: ActionsProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { userId } = useAuth();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) => {
          toast.success(`You are now following ${data.following.username}`);
        })
        .catch(() => {
          toast.error("something went wrong");
        });
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
      onUnFollow(hostIdentity)
        .then((data) => {
          toast.success(`You are now unfollowing ${data.following.username}`);
        })
        .catch(() => {
          toast.error("something went wrong");
        });
    });
  };
  const toggleFollow = () => {
    if (!userId) {
      router.push("/sign-in");
    }
    if (isHost) return;
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };
  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto "
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default Actions;

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
