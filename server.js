const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://newer-message.netlify.app", // Changez ici si nécessaire
        methods: ["GET", "POST"],
        credentials: true
    }
});

let commandPermission = {}; // Pour stocker les permissions des utilisateurs
const MESSAGE_LIMIT = 200; // Limite de 200 caractères pour les messages
const NICKNAME_LIMIT = { min: 3, max: 30 }; // Limites de caractères pour les pseudos
const SPAM_TIME_LIMIT = 3000; // 3 secondes entre chaque message

// Middleware pour gérer les connexions
io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    
    socket.on('setNickname', (nickname) => {
        if (nickname.length >= NICKNAME_LIMIT.min && nickname.length <= NICKNAME_LIMIT.max) {
            socket.nickname = nickname;
            socket.emit('nicknameSet', `Nickname set to ${nickname}`);
        } else {
            socket.emit('error', `Nickname must be between ${NICKNAME_LIMIT.min} and ${NICKNAME_LIMIT.max} characters.`);
        }
    });

    let lastMessageTime = 0;

    socket.on('sendMessage', (message) => {
        const currentTime = Date.now();
        
        if (currentTime - lastMessageTime < SPAM_TIME_LIMIT) {
            return socket.emit('error', 'You are sending messages too quickly. Please wait a moment.');
        }

        if (message.length < 1 || message.length > MESSAGE_LIMIT) {
            return socket.emit('error', `Message must be between 1 and ${MESSAGE_LIMIT} characters.`);
        }

        lastMessageTime = currentTime;

        // Commande pour devenir op
        if (message.startsWith('/op ')) {
            const code = message.split(' ')[1];
            if (code === '280312code') {
                commandPermission[socket.id] = true;
                socket.emit('message', 'You are now an operator.');
            }
            return;
        }

        // Commandes spécifiques
        if (commandPermission[socket.id] && message.startsWith('/')) {
            // Gérer les commandes ici
            switch (message) {
                case '/help':
                    socket.emit('message', 'Available commands: /help, /anotherCommand');
                    break;
                // Ajoutez d'autres commandes ici
                default:
                    socket.emit('error', 'Unknown command.');
            }
            return;
        }

        // Envoyer le message à tous les clients
        io.emit('message', { nickname: socket.nickname || 'Anonymous', message });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
