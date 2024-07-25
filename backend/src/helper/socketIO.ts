import { Server } from "socket.io";

export function ConnectToSocket(io: Server) {

    io.on('connection', (socket) => {
        console.log('socket connected');

        socket.on('join', (data) => socket.join(data))

        socket.on('message', (data) => {
            console.log(data);
            io.to(data.personId).emit('message', data)
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
 
    });

}