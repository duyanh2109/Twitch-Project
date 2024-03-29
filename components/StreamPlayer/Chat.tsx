"use client";

import { ChatVariant, useChatSideBar } from "@/store/use-chat-sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import ChatHeader, { ChatHeaderSkeleton } from "./chat-header";
import { ChatForm } from "./chat-form";
import ChatList, { ChatListSkeleton } from "./chat-list";
import ChatCommunity from "./chat-community";

interface ChatProps {
  viewName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  hostName,
  hostIdentity,
  isChatDelayed,
  isChatEnabled,
  isChatFollowersOnly,
  isFollowing,
  viewName,
}: ChatProps) => {
  const matches = useMediaQuery("(max-width:1024px)");
  const { variant, onExpand } = useChatSideBar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isOnline || !isChatEnabled;
  const [value, setValue] = useState("");
  const { chatMessages: messages, send } = useChat();
  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, []);
  const reverseMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);
  const onSubmit = () => {
    if (!send || !value) return;
    send(value);
    setValue("");
  };
  const onChange = (value: string) => {
    setValue(value);
  };
  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reverseMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isChatFollowersOnly={isChatFollowersOnly}
            isChatDelayed={isChatDelayed}
            isFollowing={isFollowing}
          ></ChatForm>
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <>
          <ChatCommunity
            viewerName={viewName}
            hostName={hostName}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2 ">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
    </div>
  );
};
