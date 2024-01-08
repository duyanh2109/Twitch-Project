"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isChatFollowersOnly: boolean;
  isChatDelayed: boolean;
  isFollowing: boolean;
}
export const ChatForm = ({
  onChange,
  onSubmit,
  isChatDelayed,
  isChatFollowersOnly,
  isFollowing,
  isHidden,
  value,
}: ChatFormProps) => {
  const [isDelayBlocked, setDelayBlocked] = useState(false);
  const isFolowersOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isDelayBlocked || isFolowersOnlyAndNotFollowing;
  return (
    <form
      className="flex flex-col items-center gap-y-4 p-3"
      onSubmit={() => {}}
    >
      <div className="w-full ">
        <Input
          onChange={() => {}}
          value={value}
          disabled={isDisabled}
          placeholder="send a message"
          className={cn(
            "border-white/10",
            isChatFollowersOnly && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div className="ml-auto">
        <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  );
};
