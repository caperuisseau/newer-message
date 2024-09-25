const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Permettre toutes les origines (à restreindre en production)
        methods: ["GET", "POST"]
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log('A user connected');

    // Recevoir un message et le diffuser à tous les clients
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
