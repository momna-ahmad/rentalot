import 'dotenv/config'; // or require('dotenv').config() if using CommonJS
import userRoutes from './routes/user.js' ;
import express from 'express';
import cors from 'cors';
import listingRoutes from './routes/listings.js' ;
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import messageRoutes from './routes/message.js' ;
import cookieParser from "cookie-parser";
import bookingRoutes from './routes/bookings.js' ;

const app = express();
const server = createServer(app);
const io = new Server(server,{
  connectionStateRecovery: {},
  cors:{
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.use((socket, next) => {
  const { userId } = socket.handshake.auth;
  if (!userId) {
    return next(new Error("No userId provided"));
  }
  socket.data.userId = userId; // attach directly
  next();
});


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // ✅ allow cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(userRoutes);
app.use(listingRoutes) ;
app.use(messageRoutes) ;
app.use(bookingRoutes) ;

const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('a user connected' , socket.id);
  const userId = socket.data.userId;

  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, new Set());
  }
  onlineUsers.get(userId).add(socket.id);

  console.log(`User ${userId} connected with socket ${socket.id}`);
  
  
  // Handle sending message
  // listen for private messages
  socket.on("send_private_message", ({ message, to }) => {
  console.log("Message from", userId, "to", to, ":", message);

  const targetSockets = onlineUsers.get(String(to));
  console.log(onlineUsers);
  if (targetSockets) {
    targetSockets.forEach((socketId) => {
      io.to(socketId).emit("receive_private_message", {
        message,
        from: userId,
      });
    });
  }
 });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});




server.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port', process.env.PORT || 5000);
});