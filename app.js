// app.js

let pseudonym = ''; // Pseudonyme de l'utilisateur

// Récupération des éléments HTML
const loginButton = document.getElementById('login-button');
const usernameInput = document.getElementById('username-input');
const sendButton = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');
const chatSection = document.getElementById('chat-section');
const loginSection = document.getElementById('login-section');
const logoutButton = document.getElementById('logout-button');

// Connexion au chat avec le pseudonyme
loginButton.addEventListener('click', () => {
  pseudonym = usernameInput.value;
  if (pseudonym.trim() !== '') {
    loginSection.style.display = 'none';
    chatSection.style.display = 'block';
  }
});

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
    addMessage(pseudonym, message);
    messageInput.value = ''; // Vider le champ après envoi
  }
});

// Envoi du message avec la touche "Enter"
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});

// Déconnexion
logoutButton.addEventListener('click', () => {
  pseudonym = '';
  chatSection.style.display = 'none';
  loginSection.style.display = 'block';
  messagesDiv.innerHTML = ''; // Vider le chat
  usernameInput.value = '';
});
