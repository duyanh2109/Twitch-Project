import { cn, stringToColor } from "@/lib/utils";
import React, { useTransition } from "react";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { MinusCircle } from "lucide-react";
import { onBlock } from "@/actions/block";
import { toast } from "sonner";
interface CommunityItemProps {
  participantIdentity: string;
  hostName: string;
  viewerName: string;
  participantName?: string;
}
const CommunityItem = ({
  participantIdentity,
  participantName,
  hostName,
  viewerName,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;
  const handleBlock = () => {
    if (!participantName || !isHost || isSelf) {
      return;
    }
    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error("Somthing went wrong"));
    });
  };
  return (
    <div
      className={cn(
        "group items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            variant="ghost"
            disabled={isPending}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            onClick={handleBlock}
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};

export default CommunityItem;
