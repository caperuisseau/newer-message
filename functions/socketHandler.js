// netlify/functions/socketHandler.js
exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    // Gestion des commandes
    const { type, message, nickname } = body;

    let responseMessage = '';

    if (type === 'sendMessage') {
        if (!message || message.length > 200 || message.length < 1) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid message length. Must be between 1 and 200 characters.' }),
            };
        }

        // Simuler la réponse du serveur avec les messages et les pseudos
        responseMessage = `${nickname || 'Anonymous'}: ${message}`;
    } else if (type === 'setNickname') {
        if (nickname.length < 3 || nickname.length > 30) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Nickname must be between 3 and 30 characters.' }),
            };
        }

        responseMessage = `Nickname set to ${nickname}`;
    }

    // Retourner la réponse
    return {
        statusCode: 200,
        body: JSON.stringify({ message: responseMessage }),
    };
};
