const socket = io('https://newer-message.onrender.com'); // URL de ton serveur

document.getElementById('send').addEventListener('click', () => {
    const message = document.getElementById('message').value;
    socket.emit('sendMessage', message);
    document.getElementById('message').value = ''; // Effacer le champ après envoi
});

socket.on('receiveMessage', (message) => {
    const messagesList = document.getElementById('messages');
    const li = document.createElement('li');
    li.textContent = message;
    messagesList.appendChild(li);
});
