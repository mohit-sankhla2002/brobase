"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
const MESSAGING_URL = process.env.MESSAGING_URL ? process.env.MESSAGING_URL : "http://localhost:8000";

const SocketContext = createContext<null | Socket>(null);

interface TSocketProvider {
    children: React.ReactNode;
}

const SocketProvider: React.FC<TSocketProvider> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(MESSAGING_URL);
    setSocket(newSocket);

    return () => {
        newSocket.disconnect();
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };

