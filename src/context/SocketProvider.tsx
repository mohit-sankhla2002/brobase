"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ModifiedMessage {
  id?: string, 
  username: string | null, 
  payload: string, 
  senderId: string, 
  groupId: string,
  createdAt?: Date
}

interface ISocketContext {
  sendMessage: (msg: ModifiedMessage) => any;
  messages: ModifiedMessage[];
  setMessages: any;
  joinGroups: (groupIds: string[]) => any;
  resetMessages: () => void;
  sendMessageToGroup: (msg: ModifiedMessage) => any;
}

export const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<ModifiedMessage[]>([]);

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      console.log("Send Message", msg);
      if (socket) {
        socket.emit("event:default_message", msg);
      }
    },
    [socket],
  );

  const sendMessageToGroup: ISocketContext["sendMessageToGroup"] = (msg) => {
    console.log("sending message to group");
    if (socket) {
      console.log(`Sending Message to ${msg.groupId}`, msg);
      socket.emit("event:group_message", msg);
    }
  };

  const joinGroups: ISocketContext["joinGroups"] = useCallback(
    (groupIds) => {
      console.log("joining groups", groupIds);
      if (socket) {
        socket.emit("event:join_group", { groupIds });
      }
    },
    [socket],
  );

  const onMessageRec = useCallback((msg: ModifiedMessage) => {
    console.log("From Server Msg Rec", msg);
    setMessages((prev) => [...prev, msg]);
  }, []);

  const onGroupMessageRec = useCallback((msg: ModifiedMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const resetMessages = useCallback(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("event:default_message", onMessageRec);
    _socket.on("event:group_message", onGroupMessageRec);
    setSocket(_socket);

    return () => {
      _socket.off("message", onMessageRec);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        sendMessage,
        messages,
        joinGroups,
        resetMessages,
        sendMessageToGroup,
        setMessages
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
