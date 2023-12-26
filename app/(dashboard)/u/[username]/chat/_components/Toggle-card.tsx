"use client";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { toast } from "sonner";
import { useTransition } from "react";
import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";
interface ToggleCardProps {
  field: FieldTypes;
  label: string;
  value: boolean;
}
export const ToggleCard = ({
  field,
  value = false,
  label,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();
  const handleCLick = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success("Chat Settings updated successfully"))
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            disabled={isPending}
            onClick={handleCLick}
            checked={value}
            className=""
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () =>{
  return <Skeleton className="rounded-xl p-10 w-full "/>
}