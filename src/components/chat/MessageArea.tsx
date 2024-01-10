"use client";

import React from "react";
import { useSocket } from "~/context/SocketProvider";

import MessageBubble from "./Messages/MessageBubble";

interface MessageAreaProps {
  userId: string
}

const MessageArea: React.FC<MessageAreaProps> = ({ userId }) => {
  const { messages } = useSocket();
  return (
    <div className="h-[90%] w-full">
      <div className="flex flex-col justify-end h-full">
        {messages.map((message, index) => {
          return <MessageBubble key={index} content={message.payload} sender={(message.userId === userId ? "user" : "other")} />
        })}
      </div>
    </div>
  );
};

export default MessageArea;
