const socket = io('https://newer-message.netlify.app', {
    transports: ['websocket'],
});

const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.emit('message', message);
        messageInput.value = ''; // Réinitialiser le champ de saisie
    }
});

socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
});
