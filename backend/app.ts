import express from 'express';
import path from 'path';
import cors from 'cors';
import { ConnectDB } from './src/database';
import morgan from 'morgan';
import http from 'http';
import userRouter from './src/routes/Users';
import adminRouter from './src/routes/Admin';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { ConnectToSocket } from './src/helper/socketIO';

dotenv.config(); 

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});
ConnectToSocket(io)

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000',
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
