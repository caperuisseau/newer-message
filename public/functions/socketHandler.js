exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { type, message, nickname } = body;

        if (!type || !message || !nickname) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Requête invalide.' }),
            };
        }

        if (type === 'sendMessage') {
            // Validation des messages
            if (message.length < 1 || message.length > 200) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Le message doit contenir entre 1 et 200 caractères.' }),
                };
            }

            // Retourner le message
            return {
                statusCode: 200,
                body: JSON.stringify({ message: `${nickname}: ${message}` }),
            };
        }

        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Type de requête inconnu.' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erreur de traitement de la requête.' }),
        };
    }
};
