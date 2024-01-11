"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import MessageArea from "./Messages/MessageArea";
import { useSearchParams } from "next/navigation";
import { useSocket } from "~/context/SocketProvider";
import { User } from "next-auth";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { MoreVertical } from "lucide-react";
import { Group } from "@prisma/client";
import GroupDetails from "./Group/GroupDetails";

interface ChatWindowProps {
  user: User;
  groups: Group[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ user, groups }) => {
  const search = useSearchParams();
  const groupName = search.get("active");
  const [message, setMessage] = useState("");
  const { sendMessage, sendMessageToGroup, resetMessages } = useSocket();

  useEffect(() => {
    resetMessages();
  }, [groupName]);
  const groupId = groups.find((group) => group.name === groupName)?.id;
  const messageHandler = () => {
    if (groupName === "Global") {
      sendMessage({
        payload: message,
        type: "default_message",
        userId: user.id,
      });
      setMessage("");
    } else {
      if (!groupId) {
        return;
      }
      sendMessageToGroup({
        payload: message,
        groupId: groupId,
        userId: user.id,
        type: "group_message",
      });
      setMessage("");
    }
  };

  return (
    <div className="relative col-span-4">
      <Image
        src="/chat-background.png"
        className="absolute -z-10 opacity-70"
        loading="lazy"
        fill
        alt="background image"
      />

      {groupName ? (
        <div className="flex h-full flex-col gap-2">
          <div className="flex w-full items-center justify-between border-b border-black bg-gray-50 p-2">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback className="dark font-light text-white">
                  {groupName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl">{groupName}</h3>
            </div>
            <GroupDetails groupName={groupName} groupId={groupId!} />
          </div>
          {/* Area for Messages */}
          <MessageArea userId={user.id} groups={groups} />
          {/* Area to Send Message */}
          <div className="flex h-[10%] w-full items-center gap-2 border-t p-4 backdrop-brightness-75">
            <Textarea
              className="overflow-hidden bg-gray-50"
              rows={1}
              cols={1}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={messageHandler}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative flex h-full w-full items-center justify-center border">
          <h3 className="text-xl font-medium tracking-tight">
            Select a Group to Start Messaging
          </h3>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
