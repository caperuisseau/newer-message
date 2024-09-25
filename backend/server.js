const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://www-message.netlify.app", // L'URL de ton site Netlify
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"], // Spécifie les en-têtes autorisés si nécessaire
        credentials: true // Si tu as besoin de gérer les cookies ou l'authentification
    }
});

// Middleware CORS
app.use(cors({
    origin: "https://www-message.netlify.app", // L'URL de ton site Netlify
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

app.use(express.static('public')); // Servir les fichiers statiques depuis le dossier public

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
