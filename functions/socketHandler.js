let opUsers = new Set();  // Stocker les utilisateurs avec les privilèges d'op

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const { type, message, nickname } = body;

    if (type === 'sendMessage') {
        // Vérifier la longueur du message
        if (!message || message.length > 200 || message.length < 1) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Le message doit contenir entre 1 et 200 caractères.' }),
            };
        }

        // Gérer les commandes
        if (message.startsWith('/')) {
            return handleCommand(message, nickname);
        }

        // Logique pour gérer les messages réguliers
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `${nickname}: ${message}` }),
        };
    }

    return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Requête invalide.' }),
    };
};

// Gérer les commandes utilisateur
function handleCommand(message, nickname) {
    const [command, ...args] = message.split(' ');

    switch (command) {
        case '/op':
            const code = args[0];
            if (code === '280312code') {
                opUsers.add(nickname);
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: `Vous êtes maintenant opérateur, ${nickname}.` }),
                };
            } else {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Code incorrect pour devenir opérateur.' }),
                };
            }

        case '/kick':
            if (opUsers.has(nickname)) {
                const userToKick = args[0];
                // Logique pour kicker un utilisateur
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: `${userToKick} a été kické par ${nickname}.` }),
                };
            } else {
                return {
                    statusCode: 403,
                    body: JSON.stringify({ error: 'Permission refusée. Vous devez être opérateur.' }),
                };
            }

        default:
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Commande non reconnue.' }),
            };
    }
}
