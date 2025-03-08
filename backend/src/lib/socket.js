import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

const socketUserMap = {};

export function getRecieverSocketId(userId){
    return socketUserMap[userId];
}



io.on("connection", (socket) => {
    console.log("User connected: " , socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        socketUserMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(socketUserMap) );
    socket.on("disconnect", () => {
        console.log("A User disconnected: " + socket.id);
        delete socketUserMap[userId];
        io.emit("getOnlineUsers", Object.keys(socketUserMap) );
    });
})

export {io, app, server};