const socket = io('https://<YOUR_RENDER_BACKEND_URL>'); // Remplace par l'URL de ton backend

// Autres codes ...

// Fonction pour afficher un message dans le chat
function addMessage(username, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = `${username}: ${message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroller vers le bas
}

// Envoi du message lors du clic sur "Send"
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
        socket.emit('sendMessage', { user: pseudonym, text: message });
        messageInput.value = ''; // Vider le champ après envoi
    }
});

// Recevoir le message du serveur
socket.on('receiveMessage', (data) => {
    addMessage(data.user, data.text);
});
