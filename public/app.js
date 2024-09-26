const socket = io('https://newer-message.netlify.app/.netlify/functions/socketHandler');

const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Événement pour envoyer un message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('message', message);
        messageInput.value = ''; // Réinitialiser le champ de saisie
    }
});

// Événement pour recevoir des messages
socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
});

// Envoi du message quand on appuie sur la touche "Entrée"
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
