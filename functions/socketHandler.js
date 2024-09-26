exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    const { type, message, nickname } = body;
    let responseMessage = '';

    if (type === 'sendMessage') {
        if (!message || message.length > 200 || message.length < 1) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Le message doit contenir entre 1 et 200 caractères.' }),
            };
        }
        responseMessage = `${nickname || 'Anonyme'}: ${message}`;
    } else if (type === 'setNickname') {
        if (nickname.length < 3 || nickname.length > 30) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Le pseudo doit contenir entre 3 et 30 caractères.' }),
            };
        }
        responseMessage = `Pseudo défini à ${nickname}`;
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: responseMessage }),
    };
};
