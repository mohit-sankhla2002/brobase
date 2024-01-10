"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import MessageArea from "./MessageArea";
import { useSearchParams } from "next/navigation";
import { useSocket } from "~/context/SocketProvider";
import { User } from "next-auth";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { MoreVertical } from "lucide-react"

interface ChatWindowProps {
  user: User
}

const ChatWindow: React.FC<ChatWindowProps> = ({ user }) => {
  const search = useSearchParams();
  const groupName = search.get("active");
  const [ message, setMessage ] = useState("");
  const { sendMessage } = useSocket();
  
  const messageHandler = () => {
    if (groupName === "Global") {
      sendMessage({
        payload: message, 
        type: "default_message",
        userId: user.id
      });
      setMessage("");
    }
  }

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
          <div className="flex p-2 w-full bg-gray-50 border-b border-black items-center justify-between">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarFallback className="font-light dark text-white">{groupName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h3 className="text-xl">{groupName}</h3>
        </div>
        <Button size="icon" variant="ghost" className="mr-4 rounded-full"><MoreVertical className="w-4 h-4" /></Button>
      </div>
          {/* Area for Messages */}
          <MessageArea userId={user.id}/>
          {/* Area to Send Message */}
          <div className="flex h-[10%] w-full items-center gap-2 border-t p-4 backdrop-brightness-75">
            <Textarea
              className="overflow-hidden bg-gray-50"
              rows={1}
              cols={1}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <Button variant="secondary" size="icon" className="rounded-full" onClick={messageHandler}>
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
