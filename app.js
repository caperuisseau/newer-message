const socket = io('https://newer-message.netlify.app', {
    transports: ['websocket'],
    withCredentials: true,
});

const messagesContainer = document.getElementById('messages');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

let username = '';

// Écoute les messages envoyés par le serveur
socket.on('message', (data) => {
    displayMessage(data);
});

// Écoute pour la saisie de l'utilisateur
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Fonction pour envoyer un message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (!username) {
        username = usernameInput.value.trim();
        if (username.length < 3 || username.length > 30) {
            alert('Le pseudo doit avoir entre 3 et 30 caractères.');
            return;
        }
    }

    if (messageText.length < 1 || messageText.length > 200) {
        alert('Le message doit avoir entre 1 et 200 caractères.');
        return;
    }

    // Envoi du message
    socket.emit('message', { username, text: messageText });
    messageInput.value = '';
}

// Fonction pour afficher un message
function displayMessage(data) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.text}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll automatique vers le bas
}
