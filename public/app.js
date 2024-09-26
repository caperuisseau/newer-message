const apiUrl = '/.netlify/functions/socketHandler'; // Fonction Netlify

// Éléments DOM
const messageInput = document.getElementById('messageInput');
const messageForm = document.getElementById('messageForm');
const messagesContainer = document.getElementById('messages');
const nicknameInput = document.getElementById('nicknameInput');

// Gestion de la soumission du formulaire
messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    const nickname = nicknameInput.value.trim() || 'Anonymous';

    if (message) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify({ type: 'sendMessage', message, nickname }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                displayMessage(data.message);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }

        messageInput.value = '';
    }
});

// Fonction pour afficher un message dans le chat
function displayMessage(message) {
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    messagesContainer.appendChild(msgElement);
}

// Envoi du pseudo lorsqu'il est défini
nicknameInput.addEventListener('blur', async () => {
    const nickname = nicknameInput.value.trim();
    if (nickname) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify({ type: 'setNickname', nickname }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error setting nickname:', error);
        }
    }
});

// Envoi du message avec la touche "Entrée"
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        messageForm.dispatchEvent(new Event('submit'));
    }
});
