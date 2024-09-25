const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['https://www-message.netlify.app', 'https://newer-message.netlify.app'],
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});

app.use(cors());

// ton code pour les socket.io ici

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
