"use client";

import React, { useEffect } from "react";
import { useSocket } from "~/context/SocketProvider";
import { useSearchParams } from "next/navigation";
import MessageBubble from "./MessageBubble";
import { Group } from "@prisma/client";
import { api } from "~/trpc/react";
import { Delete, Loader2 } from "lucide-react";

interface MessageAreaProps {
  userId: string;
  groups: Group[];
}

const MessageArea: React.FC<MessageAreaProps> = ({ userId, groups }) => {
  const { messages, setMessages } = useSocket();
  const search = useSearchParams();
  const groupName = search.get("active");

  const groupId = groups.find((group) => group.name === groupName)?.id;

  if (!groupId) {
    return null;
  }

  const { data, isLoading } = api.message.getMessages.useQuery({
    groupId: groupId,
  });

  useEffect(() => {
    setMessages(data);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-[90%] w-full items-center justify-center">
        Loading Messages <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!messages) {
    return (
      <div className="flex h-[90%] w-full items-center justify-center">
        No Messages Yet <Delete />
      </div>
    );
  }
  console.log(messages);
  const filteredMessages = messages.filter(
    (message) => message.groupId === groupId,
  );

  return (
    <div className="max-h-full h-full flex flex-col overflow-y-scroll">
      {filteredMessages.map((message, index) => {
        return (
          <MessageBubble
            key={index}
            content={message.payload}
            sender={message.senderId === userId ? "user" : "other"}
            senderName={message.username!}
            createdAt={message.createdAt!}
          />
        );
      })}
    </div>
  );
};

export default MessageArea;
