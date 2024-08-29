// src/server.ts
import express from 'express';
import http from 'http';
import cors from 'cors'
import { Server as SocketIOServer } from 'socket.io';

const app = express();
app.use(cors({ origin: '*' }));
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
	    methods: ['GET','POST']
    }
});


io.on('connection', (socket) => {
    console.log('New user connected: ', socket.id);

    // Ketika server menerima pesan dari klien
    socket.on('message', (message: any) => {
        const messageObject = {
            text: message.text || message,
            sender: socket.id
        }
    // Kirim pesan ini ke semua klien, termasuk pengirim
        io.emit('message', messageObject);
    });

    // Ketika klien terputus
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
