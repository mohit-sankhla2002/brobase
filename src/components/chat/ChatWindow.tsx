"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import MessageArea from "./MessageArea";
import { api } from "~/trpc/react";
import { useSearchParams } from "next/navigation";

const ChatWindow: React.FC = () => {
  const search = useSearchParams();
  const groupName = search.get("activeGroup");

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
        <div className="flex h-full flex-col">
          {/* Area for Messages */}
          <MessageArea />
          {/* Area to Send Message */}
          <div className="relative flex h-[10%] w-full items-center gap-2 border-t bg-opacity-10 p-4 backdrop-brightness-75">
            <Textarea
              className="overflow-hidden bg-gray-50"
              rows={1}
              cols={1}
            />
            <Button variant="secondary" size="icon" className="rounded-full">
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
