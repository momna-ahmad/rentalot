import 'dotenv/config'; // or require('dotenv').config() if using CommonJS
import userRoutes from './routes/user.js' ;
import express from 'express';
import cors from 'cors';
import listingRoutes from './routes/listings.js' ;
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import messageRoutes from './routes/message.js' ;

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

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // ✅ allow cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(userRoutes);
app.use(listingRoutes) ;
app.use(messageRoutes) ;

io.on('connection', (socket) => {
  console.log('a user connected');

  // Join a private room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Handle sending message
  socket.on('send_private_message', ({ roomId, message, sender }) => {
    console.log(`Message in ${roomId} from ${sender}: ${message}`);
    io.to(roomId).emit('receive_private_message', { message, sender });
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



server.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port', process.env.PORT || 5000);
});