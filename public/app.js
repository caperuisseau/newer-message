const socket = io('/'); // Connexion au serveur Socket.IO

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Écoute les messages reçus
socket.on('message', (message) => {
    addMessage(message, 'received');
});

// Envoie un message lorsque le bouton est cliqué
sendButton.addEventListener('click', () => {
    sendMessage();
});

// Envoie un message lorsque la touche "Entrée" est pressée
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Fonction pour envoyer un message
function sendMessage() {
    const message = messageInput.value;
    if (message) {
        addMessage(message, 'sent');
        socket.emit('message', message); // Émet le message
        messageInput.value = ''; // Réinitialise le champ de saisie
    }
}

// Fonction pour ajouter un message à l'interface
function addMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Fait défiler vers le bas
}
