"use client";

import { onBlock, onUnBlock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface ActionProps {
  isFollowing: boolean;
  userId: string;
}
export const Actions = ({ isFollowing, userId }: ActionProps) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleunFollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then((data) =>
          toast.success(`You are now unfollowing ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleClick = () => {
    if (isFollowing) {
      handleunFollow();
    } else {
      handleFollow();
    }
  };
  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`You are now block ${data.blockedBy.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  }
  const handleunBlock = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((data) =>
          toast.success(`You are now unblock ${data.blockedBy.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  }
  return (
    <>
      <Button
        disabled={isPending}
        variant={isFollowing ? "destructive" : "primary"}
        onClick={handleClick}
      >
        {isFollowing ? "Unfollow" : "follow"}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>Block</Button>
    </>
  );
};
