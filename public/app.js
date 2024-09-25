const socket = io('https://newer-message.onrender.com'); // Remplace par l'URL de ton serveur
let username;

document.getElementById('setUser').addEventListener('click', () => {
    username = document.getElementById('username').value.trim(); // Trim pour enlever les espaces
    if (username) {
        socket.emit('setUsername', username); // Envoie le pseudonyme au serveur
        document.getElementById('username').value = ''; // Effacer le champ après saisie
    } else {
        alert('Veuillez entrer un pseudonyme valide'); // Alerte si le pseudonyme est vide
    }
});

document.getElementById('send').addEventListener('click', () => {
    const message = document.getElementById('message').value;
    if (message.trim()) {
        socket.emit('sendMessage', message);
        document.getElementById('message').value = ''; // Effacer le champ après envoi
    } else {
        alert('Veuillez entrer un message valide'); // Alerte si le message est vide
    }
});

socket.on('receiveMessage', (data) => {
    const messagesList = document.getElementById('messages');
    const li = document.createElement('li');
    li.textContent = `${data.username}: ${data.message}`; // Affiche le pseudonyme et le message
    messagesList.appendChild(li);
});
