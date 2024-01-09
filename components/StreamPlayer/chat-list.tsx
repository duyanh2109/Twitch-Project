import { ReceivedChatMessage } from "@livekit/components-react";
import React from "react";
import ChatMessage from "./chat-message";
interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}
const ChatList = ({ messages, isHidden }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>{isHidden ? "Chat is disabled" : "Welcome to Chat"}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full ">
      {messages.map((message) => (
        <ChatMessage data={message} key={message.timestamp} />
      ))}
    </div>
  );
};

export default ChatList;
