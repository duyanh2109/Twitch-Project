import { stringToColor } from "@/lib/utils";
import {format} from "date-fns"
import { ReceivedChatMessage } from "@livekit/components-react";
import React from "react";
interface ChatMessageProps {
  data: ReceivedChatMessage;
}
const ChatMessage = ({ data }: ChatMessageProps) => {
  const color = stringToColor(data.from?.name || "");
  return <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
    <p>{format(data.timestamp,"HH:MM")}</p>
    <div className="flex flex-wrap items-baseline gap-1 grow">
        <p className="text-sm font-semibold whitespace-nowrap">
            <span>{data.from?.name}</span>
        </p>
    </div>
    </div>;
};

export default ChatMessage;
