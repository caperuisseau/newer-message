const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://www-message.netlify.app", // Remplace avec ton site
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});

// Middleware CORS
app.use(cors({
    origin: "https://www-message.netlify.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

// Serve les fichiers statiques
app.use(express.static('public'));

let users = {}; // Pour stocker les pseudonymes

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    // Écoute pour l'événement de pseudonyme
    socket.on('setUsername', (username) => {
        users[socket.id] = username; // Associe l'ID du socket au pseudonyme
        console.log(`Pseudonyme défini: ${username}`); // Log pour déboguer
        socket.emit('userSet', { username: username }); // Envoie le pseudonyme à l'utilisateur
    });

    socket.on('sendMessage', (message) => {
        const username = users[socket.id] || 'Anonyme';
        console.log(`Message reçu de ${username}: ${message}`); // Log pour déboguer
        io.emit('receiveMessage', { username, message }); // Envoie le message avec le pseudonyme
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
        delete users[socket.id]; // Supprime l'utilisateur de la liste
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
s
