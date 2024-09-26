const socket = io('https://newer-message.netlify.app', {
  transports: ['websocket'],
  withCredentials: true
});

const messageInput = document.getElementById('message');
const nicknameInput = document.getElementById('nickname');
const messagesDiv = document.getElementById('messages');
const sendButton = document.getElementById('send');

// Fonction pour envoyer un message
function sendMessage() {
  const message = messageInput.value;
  const nickname = nicknameInput.value;

  if (message.length > 0 && nickname.length >= 3) {
    socket.emit('chatMessage', { message, nickname });
    addMessage({ message, nickname }, true);  // Ajoute immédiatement le message de l'utilisateur
    messageInput.value = '';  // Réinitialiser le champ de saisie après envoi
  }
}

// Fonction pour ajouter un message dans la fenêtre de chat
function addMessage({ message, nickname }, isSentBySelf = false) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(isSentBySelf ? 'sent' : 'received');
  messageElement.innerText = `${nickname}: ${message}`;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;  // Scroll automatique vers le bas
}

// Envoi d'un message lorsque le bouton est cliqué ou "Entrée" est pressé
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Réception des messages des autres utilisateurs
socket.on('chatMessage', (data) => {
  addMessage(data);
});
