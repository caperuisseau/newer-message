let clients = [];

exports.handler = async (event, context) => {
    const { WebSocketServer } = require('ws');
    const wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws) => {
        clients.push(ws);

        ws.on('message', (message) => {
            // Émettre le message à tous les clients connectés
            clients.forEach(client => {
                if (client.readyState === client.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            // Retirer le client de la liste
            clients = clients.filter(client => client !== ws);
        });
    });

    return {
        statusCode: 200,
        body: 'WebSocket server is running',
    };
};
