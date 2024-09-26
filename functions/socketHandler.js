const { Server } = require("socket.io");

exports.handler = async (event) => {
    const io = new Server(event.socket);

    io.on('connection', (socket) => {
        console.log('Un client est connecté');

        socket.on('message', (message) => {
            // Émettre le message à tous les clients connectés
            io.emit('message', message);
        });

        socket.on('disconnect', () => {
            console.log('Un client est déconnecté');
        });
    });

    return {
        statusCode: 200,
        body: 'WebSocket server is running',
    };
};
