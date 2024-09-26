document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message');
    const chatBox = document.getElementById('chat-box');

    const nickname = prompt("Entrez votre pseudo (entre 3 et 30 caractères) :");

    // Limiter le pseudo
    if (nickname.length < 3 || nickname.length > 30) {
        alert('Pseudo invalide. Le pseudo doit contenir entre 3 et 30 caractères.');
        return;
    }

    // Envoie de messages
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();

        if (message.length === 0 || message.length > 200) {
            alert('Le message doit contenir entre 1 et 200 caractères.');
            return;
        }

        // Envoyer le message à la fonction Netlify
        fetch('/.netlify/functions/socketHandler', {
            method: 'POST',
            body: JSON.stringify({
                type: 'sendMessage',
                message: message,
                nickname: nickname,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                chatBox.innerHTML += `<div class="message"><strong>${nickname}:</strong> ${message}</div>`;
            }
            messageInput.value = '';
        })
        .catch(err => console.error('Erreur:', err));
    });
});
