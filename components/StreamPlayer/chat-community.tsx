"use client";
import { useParticipants } from "@livekit/components-react";
import React, { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import CommunityItem from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";
interface ChatCommunityProps {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}
const ChatCommunity = ({
  viewerName,
  hostName,
  isHidden,
}: ChatCommunityProps) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce<string>(value, 500);
  const participants = useParticipants();
  const onChange = (newValue: string) => {
    setValue(newValue);
  };
  const filterParticipants = useMemo(() => {
    const depuped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return depuped.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase());
    });
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is Disabled</p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <Input
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder="Search community..."
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm  text-muted-foreground hidden last:block p-2">
          No Results
        </p>
        {filterParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            participantIdentity={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
