"use client"

import React from "react";

interface MessageBubbleProps {
  content: string;
  sender: "user" | "other";
  senderName: string;
  createdAt: Date
}

import { formatAMPM } from "~/lib/utils";

const MessageBubble: React.FC<MessageBubbleProps> = ({ content, sender, senderName, createdAt }) => {
  return (
    <div
      className={`mx-2 my-1 max-w-md rounded-md p-2 ${
        sender === "user"
          ? "self-end bg-gray-100"
          : "self-start bg-gray-200"
      }`}
    >
      <h5 className="text-xs text-muted-foreground font-medium tracking-tighter">{senderName}</h5>
      <p>{content}</p>
      <p className="text-[10px] text-gray-500 text-right">{formatAMPM(createdAt)}</p>
    </div>
  );
};

export default MessageBubble;
