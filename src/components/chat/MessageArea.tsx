"use client";

import React from "react";
import { useSocket } from "~/context/SocketProvider";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react"

interface MessageAreaProps {
  groupName: string
}

const MessageArea: React.FC<MessageAreaProps> = ({ groupName }) => {
  const { messages } = useSocket();
  return (
    <div className="relative h-[90%] w-full">
      <div className="flex p-2 w-full bg-gray-50 border-b border-black items-center justify-between">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarFallback className="font-light dark text-white">{groupName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h3 className="text-xl">{groupName}</h3>
        </div>
        <Button size="icon" variant="ghost" className="mr-4 rounded-full"><MoreVertical className="w-4 h-4" /></Button>
      </div>
      <div className="flex">
        {messages.map((message, index) => {
          return <li key={index}>{message}</li>
        })}
      </div>
    </div>
  );
};

export default MessageArea;
