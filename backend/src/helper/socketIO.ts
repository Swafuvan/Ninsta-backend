import { Server } from "socket.io";
import { userRepository } from "../repository/users/userRepository";

const userrepo = new userRepository()

export function ConnectToSocket(io: Server) {

    io.on('connection', (socket) => {
        console.log('socket connected');

        socket.on('join', (data) => {
            socket.join(data)
        })

        socket.on('send_message', async (data) => {
            const chatRespone = await userrepo.UserChats(data)
            io.to(data.to).emit('send_message', chatRespone);
        })

        socket.on('messages_seen', async (datas) => {
            const seenResponse = await userrepo.messageSeen(datas);
            console.log(seenResponse,"______")
            io.to(datas.to).emit('messages_seen', {
                from: datas.from,
                to: datas.to,
                messageIds: seenResponse
            });

        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

    });

}