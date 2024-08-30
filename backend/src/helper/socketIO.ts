import { Server } from "socket.io";
import { userRepository } from "../repository/users/userRepository";

const userrepo = new userRepository()
let onlineUsers:string[] = []

export function ConnectToSocket(io: Server) {

    io.on('connection', (socket) => {
        console.log('socket connected');

        socket.on('join', (data) => {
            socket.join(data);
            if(!onlineUsers.includes(data)) {
                onlineUsers.push(data)
            }
        })

        socket.on('send_message', async (data) => {
            const chatRespone = await userrepo.UserChats(data)
            io.to(data.to).emit('send_message', chatRespone);
            console.log(onlineUsers)
            if(!onlineUsers.includes(data.to)){
                console.log('vanthitta');
                const userMsgNotif = await userrepo.messageNotification(data);
            }
        })

        socket.on('messages_seen', async (datas) => {
            const seenResponse = await userrepo.messageSeen(datas);
            io.to(datas.to).emit('messages_seen', {
                from: datas.from,
                to: datas.to,
                messageIds: seenResponse
            });

        })

        socket.on("disconnectUsers",(userId)=>{
            onlineUsers = onlineUsers.filter(user => user!== userId)
            console.log('Users', onlineUsers, userId)
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

    });

}