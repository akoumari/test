const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const {formatMessage,formatMessageBot} = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  getCurrentRoom,
  userLeave,
  getRoomUsers,
  getChatLog
} = require('./utils/users');
import {
  User,
  Room,
  Message
} from "./model";

const app = express();
const server = http.createServer(app);
const io = socketio(server);
import connect from "./utils/mongoCon"

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', async ({ username, room }) => {
    console.log(socket.id)
    let user = await userJoin(socket.id, username, room);
    console.log(user)

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessageBot(user.room, 'Welcome to ChatCord!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessageBot(user.room, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: await getRoomUsers(socket.id), 
      chatLog: await getChatLog(socket.id)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', async msg => {
    let user = await getCurrentUser(socket.id);
    let room = await getCurrentRoom(socket.id);
    let mess =  await formatMessage(socket.id, msg)
    console.log(mess)
    io.to(room.roomName).emit('message', mess);
  });

  // Runs when client disconnects
  socket.on('disconnect', async () => {
    
    let user = await getCurrentUser(socket.id);
    let userBeGone = userLeave(socket.id);
    let room = await getCurrentRoom(socket.id);
    if (room) {
      io.to(room.roomName).emit(
        'message',
        formatMessageBot(room.roomName, `${user.userName} has left the chat`)
      );

      // Send users and room info
      io.to(room.roomName).emit('roomUsers', {
        room: room.roomName,
        users: await getRoomUsers(socket.id)
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
