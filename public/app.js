document.addEventListener('DOMContentLoaded', () => {
    const socket = io('https://newer-message.onrender.com'); // Remplace par l'URL de ton backend

    const loginSection = document.getElementById('login-section');
    const chatSection = document.getElementById('chat-section');
    const usernameInput = document.getElementById('username-input');
    const loginButton = document.getElementById('login-button');
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const logoutButton = document.getElementById('logout-button');

    let pseudonym = '';

    loginButton.addEventListener('click', () => {
        pseudonym = usernameInput.value.trim();
        if (pseudonym) {
            loginSection.style.display = 'none';
            chatSection.style.display = 'block';
        }
    });

    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            socket.emit('sendMessage', { user: pseudonym, text: message });
            messageInput.value = ''; // Vider le champ après envoi
        }
    });

    socket.on('receiveMessage', (data) => {
        addMessage(data.user, data.text);
    });

    // Fonction pour afficher un message dans le chat
    function addMessage(username, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = `${username}: ${message}`;
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroller vers le bas
    }

    logoutButton.addEventListener('click', () => {
        loginSection.style.display = 'block';
        chatSection.style.display = 'none';
        pseudonym = '';
        messagesDiv.innerHTML = ''; // Vider les messages à la déconnexion
    });
});
