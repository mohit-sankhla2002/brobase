import React from "react";

interface MessageBubbleProps {
  content: String;
  sender: "user" | "other" ;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ content, sender }) => {
  return (
    <div
      className={`mx-2 my-1 max-w-md rounded-md p-2 ${
        sender === "user"
          ? "self-end bg-gray-200"
          : "self-start bg-black text-white"
      }`}
    >
      {content}
    </div>
  );
};

export default MessageBubble;
