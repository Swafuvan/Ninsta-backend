import express from 'express';
import path from 'path';
import cors from 'cors';
import { ConnectDB } from './database';
import morgan from 'morgan';
import http from 'http';
import userRouter from './routes/Users';
import adminRouter from './routes/Admin';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { ConnectToSocket } from './helper/socketIO';

dotenv.config(); 

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_API,
    methods: ['GET', 'POST'],
    credentials: true
  }
});
ConnectToSocket(io)

app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_API,
  credentials: true
}));

app.use(express.json());

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.use(express.static(path.join(__dirname, 'public')));

ConnectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { // Change app.listen to server.listen
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
