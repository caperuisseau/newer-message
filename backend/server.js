const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Initialiser Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Autoriser toutes les origines (à restreindre en production)
        methods: ["GET", "POST"]
    }
});

app.use(cors());

// Gérer la connexion des clients
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    // Recevoir un message et le diffuser à tous les clients
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000; // Utiliser le port 5000 ou le port défini par l'environnement
server.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
