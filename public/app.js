const socket = io('https://newer-message.onrender.com', {
    transports: ['websocket'], // Assurez-vous d'utiliser le bon transport
    withCredentials: true,
});

// Éléments DOM
const messageInput = document.getElementById('messageInput');
const messageForm = document.getElementById('messageForm');
const messagesContainer = document.getElementById('messages');
const nicknameInput = document.getElementById('nicknameInput');

// Gestion de la soumission du formulaire
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('sendMessage', message);
        messageInput.value = '';
    }
});

// Événement pour recevoir des messages
socket.on('message', ({ nickname, message }) => {
    const msgElement = document.createElement('div');
    msgElement.innerText = `${nickname}: ${message}`;
    messagesContainer.appendChild(msgElement);
});

// Événement pour les erreurs
socket.on('error', (error) => {
    alert(error); // Vous pouvez remplacer ceci par un affichage plus élégant
});

// Configuration du pseudo
nicknameInput.addEventListener('blur', () => {
    const nickname = nicknameInput.value.trim();
    socket.emit('setNickname', nickname);
});

// Envoi du message avec la touche "Entrée"
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        messageForm.dispatchEvent(new Event('submit'));
    }
});
