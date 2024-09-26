const WebSocket = require('ws');

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Émettre le message à tous les clients connectés
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Pour l'intégration avec Netlify
exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: 'WebSocket server is running',
    };
};
