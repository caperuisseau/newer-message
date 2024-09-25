const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['https://www-message.netlify.app', 'https://newer-message.netlify.app'], // Ajoute toutes les origines nécessaires
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});

// Middleware CORS
app.use(cors({
    origin: ['https://www-message.netlify.app', 'https://newer-message.netlify.app'], // Ajoute toutes les origines nécessaires ici aussi
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// Événement de connexion Socket.IO
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    // Recevoir un message
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    // Événement de déconnexion
    socket.on('disconnect', () => {
        console.log('Un utilisateur est déconnecté');
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
