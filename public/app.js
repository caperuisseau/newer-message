const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

async function fetchMessages() {
    try {
        const response = await fetch('/.netlify/functions/getMessages');
        const messages = await response.json();
        messagesContainer.innerHTML = '';
        messages.forEach((message) => {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messagesContainer.appendChild(messageElement);
        });
    } catch (err) {
        console.error('Erreur lors de la récupération des messages', err);
    }
}

async function sendMessage(message) {
    try {
        await fetch('/.netlify/functions/sendMessage', {
            method: 'POST',
            body: JSON.stringify({ message }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        messageInput.value = '';
        fetchMessages(); // Actualiser les messages après l'envoi
    } catch (err) {
        console.error('Erreur lors de l\'envoi du message', err);
    }
}

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        sendMessage(message);
    }
});

// Envoyer le message avec "Entrée"
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

// Rafraîchir les messages toutes les 3 secondes
setInterval(fetchMessages, 3000);

fetchMessages();
