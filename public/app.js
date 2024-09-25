const socket = io('https://newer-message.onrender.com', {
    transports: ['websocket'],
    withCredentials: true,
});

// Set nickname
const nickname = prompt("Entrez votre pseudo:");
socket.emit('setNickname', nickname);

// Message handler
const messageInput = document.getElementById('messageInput');
const messageList = document.getElementById('messageList');

messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = messageInput.value;
    socket.emit('sendMessage', message);
    messageInput.value = '';
}

socket.on('newMessage', (data) => {
    const li = document.createElement('li');
    li.textContent = `${data.nickname}: ${data.message}`;
    messageList.appendChild(li);
});

socket.on('error', (message) => {
    alert(message);
});

socket.on('commandResponse', (message) => {
    alert(message);
});
