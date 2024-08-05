import { Server } from "socket.io";
import { userRepository } from "../repository/users/userRepository";

const userrepo = new userRepository()

export function ConnectToSocket(io: Server) {

    io.on('connection', (socket) => {
        console.log('socket connected');

        socket.on('join', (data) => {
            socket.join(data)})

        socket.on('send_message',async (data) => {
            const chatRespone =await userrepo.UserChats(data)
            io.to(data.to).emit('send_message', data);
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


 
    });

}