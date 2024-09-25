const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://newer-message.netlify.app", // Change to your front-end domain
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());
app.use(express.static('public'));

const connectedUsers = {};
const messages = [];
const commandUsers = {}; // Pour stocker les utilisateurs ayant effectué la commande /op

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    socket.on('setNickname', (nickname) => {
        // Validation du pseudo
        if (nickname.length < 3 || nickname.length > 30) {
            socket.emit('error', 'Le pseudo doit avoir entre 3 et 30 caractères.');
            return;
        }
        connectedUsers[socket.id] = nickname;
        socket.emit('nicknameSet', nickname);
        console.log(`Nickname set for ${socket.id}: ${nickname}`);
    });

    socket.on('sendMessage', (message) => {
        const nickname = connectedUsers[socket.id];
        
        // Antispam : 1 message par 2 secondes
        if (commandUsers[socket.id] && commandUsers[socket.id].lastMessageTime) {
            const now = Date.now();
            if (now - commandUsers[socket.id].lastMessageTime < 2000) {
                socket.emit('error', 'Vous devez attendre 2 secondes avant d\'envoyer un autre message.');
                return;
            }
        }

        // Validation du message
        if (message.length < 1 || message.length > 200) {
            socket.emit('error', 'Le message doit contenir entre 1 et 200 caractères.');
            return;
        }

        messages.push({ nickname, message });
        io.emit('newMessage', { nickname, message });
        commandUsers[socket.id].lastMessageTime = Date.now(); // Met à jour l'heure du dernier message
    });

    socket.on('command', (command) => {
        const nickname = connectedUsers[socket.id];

        if (command === '/op me 280312code') {
            commandUsers[socket.id] = { authorized: true }; // Autorise l'utilisateur à utiliser des commandes
            socket.emit('commandResponse', 'Vous êtes désormais autorisé à utiliser des commandes.');
        } else if (command.startsWith('/')) {
            if (!commandUsers[socket.id] || !commandUsers[socket.id].authorized) {
                socket.emit('error', 'Vous devez d\'abord exécuter la commande /op me 280312code.');
                return;
            }
            // Traitement des autres commandes
            socket.emit('commandResponse', `Commande "${command}" exécutée.`);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
        delete connectedUsers[socket.id];
        delete commandUsers[socket.id];
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
