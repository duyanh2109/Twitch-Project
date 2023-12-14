import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LiveBadge } from "@/components/Live-badge";
import { Skeleton } from "@/components/ui/skeleton";

const avatarSizes = cva("", {
  variants: {
    size: {
      defaults: "h-8 w-8",
      lg: "h-14 w-14",
    },
    defaultVariants: {
      size: "default",
    },
  },
});
interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
}
const UserAvatar = ({
  imageUrl,
  username,
  isLive,
  showBadge,
  size,
}: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive;

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;

interface UserAvaterSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const AvatarSkeleton = ({ size }: UserAvaterSkeletonProps) => {
  return (
    <Skeleton className={cn("rounded-full", avatarSizes({ size }))}></Skeleton>
  );
};
