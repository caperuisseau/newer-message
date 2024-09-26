const { Server } = require("socket.io");

exports.handler = async (event, context) => {
    const io = new Server();

    // Établir la connexion
    io.on('connection', (socket) => {
        console.log('Un utilisateur est connecté');

        // Écoute des messages
        socket.on('message', (message) => {
            console.log('Message reçu: ', message);
            io.emit('message', message); // Émet le message à tous les clients
        });

        socket.on('disconnect', () => {
            console.log('Un utilisateur est déconnecté');
        });
    });

    // Exécutez le serveur Socket.IO ici...
    return {
        statusCode: 200,
        body: 'Fonction Socket.IO',
    };
};
