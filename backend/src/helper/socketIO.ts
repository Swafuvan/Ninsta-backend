import { Server } from "socket.io";

export function ConnectToSocket(io: Server) {

    io.on('connection', (socket) => {
        console.log('socket connected');

        socket.on('join', (data) => {
            console.log(data,"joined id")
            socket.join(data)})

        socket.on('send_message', (data) => {
            console.log(data);
            io.to(data.to).emit('send_message', data)
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


 
    });

}