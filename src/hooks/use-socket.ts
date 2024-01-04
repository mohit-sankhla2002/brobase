"use client"

import { useContext } from "react"
import { SocketContext } from "~/context/SocketProvider";


export const useSocket = () => {
    const state = useContext(SocketContext);

    if (!state) {
        throw new Error("Socket State is not defined");
    }

    return state;
}

