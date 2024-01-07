"use client"

import { SocketContext } from "~/context/SocketProvider";
import { useContext } from "react";

export const sendMessage = (message: string, groupId: string) => {
    const socket = useContext(SocketContext);

    if (!socket) {
        // this error exists when socket is not found in the client side
        throw new Error("Socket was not found");
    }

    socket.emit("event:message", JSON.stringify({
        message: message, 
        groupId: groupId
    }));
}

