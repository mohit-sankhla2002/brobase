import { io } from 'socket.io-client';

const connect = () => {
    const socket = io("http://localhost:8000");
    return socket;
}

export const sendMessage = (props: {payload: string, groupId: string}) => {
    const socket = connect();
    socket.emit("MESSAGE", props);
    socket.disconnect();
}

export const joinGroup = (props: { groups: string[] }) => {
    const socket = connect();
    socket.emit("JOIN_GROUP", props);
    socket.disconnect();
}

