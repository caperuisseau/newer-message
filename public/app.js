const socket = io('https://newer-message.onrender.com'); // Remplace par l'URL de ton serveur
let username;

document.getElementById('setUser').addEventListener('click', () => {
    username = document.getElementById('username').value;
    socket.emit('setUsername', username); // Envoie le pseudonyme au serveur
});

document.getElementById('send').addEventListener('click', () => {
    const message = document.getElementById('message').value;
    socket.emit('sendMessage', message);
    document.getElementById('message').value = ''; // Effacer le champ après envoi
});

socket.on('receiveMessage', (data) => {
    const messagesList = document.getElementById('messages');
    const li = document.createElement('li');
    li.textContent = `${data.username}: ${data.message}`; // Affiche le pseudonyme et le message
    messagesList.appendChild(li);
});
