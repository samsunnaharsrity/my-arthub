import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:7000"); 
  }
  return socket;
};