const io = require('socket.io')(server); // ou ce que vous utilisez pour initialiser Socket.IO

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    // Votre logique de traitement ici
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success' }),
    };
};
