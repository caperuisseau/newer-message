const { Server } = require("socket.io");

let io;

exports.handler = async (event, context) => {
    if (!io) {
        io = new Server({
            cors: {
                origin: "https://newer-message.netlify.app", // Remplacez par votre domaine
            },
        });

        io.on('connection', (socket) => {
            console.log('Un utilisateur est connecté');

            socket.on('message', (message) => {
                console.log('Message reçu: ', message);
                io.emit('message', message); // Émet le message à tous les clients
            });

            socket.on('disconnect', () => {
                console.log('Un utilisateur est déconnecté');
            });
        });
    }

    return {
        statusCode: 200,
        body: 'Socket.IO est opérationnel',
    };
};
