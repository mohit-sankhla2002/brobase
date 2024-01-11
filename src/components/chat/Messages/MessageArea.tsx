"use client";

import React from "react";
import { useSocket } from "~/context/SocketProvider";
import { useSearchParams } from "next/navigation";
import MessageBubble from "./MessageBubble";
import { Group } from "@prisma/client";

interface MessageAreaProps {
  userId: string;
  groups: Group[];
}

const MessageArea: React.FC<MessageAreaProps> = ({ userId, groups }) => {
  const { messages } = useSocket();
  const search = useSearchParams();
  const groupName = search.get("active");

  if (groupName === "Global") {
    console.log(messages);

    return (
      <div className="h-[90%] w-full">
        <div className="flex h-full flex-col justify-end">
          {messages.map((message, index) => {
            if (
              message.type === "default_message" &&
              message.groupId === undefined
            ) {
              return (
                <MessageBubble
                  key={index}
                  content={message.payload}
                  sender={message.userId === userId ? "user" : "other"}
                />
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    const groupId = groups.find((group) => group.name === groupName)?.id;
    const filteredMessages = messages.filter(
      (message) => message.groupId === groupId,
    );

    return (
      <div className="h-[90%] w-full">
        <div className="flex h-full flex-col justify-end">
          {filteredMessages.map((message, index) => {
            return (
              <MessageBubble
                key={index}
                content={message.payload}
                sender={message.userId === userId ? "user" : "other"}
              />
            );
          })}
        </div>
      </div>
    );
  }
};

export default MessageArea;
