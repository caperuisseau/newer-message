// Attendez que le DOM soit complètement chargé

document.addEventListener("DOMContentLoaded", () => {
    const socket = io("https://newer-message.onrender.com"); // Remplacez par votre URL si nécessaire
    const usernameInput = document.getElementById("username");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send-button");
    const messagesList = document.getElementById("messages");
    const userList = document.getElementById("user-list");
    
    let username = "";

    // Demander un pseudo à l'utilisateur
    while (!username) {
        username = prompt("Entrez votre pseudo:");
        if (username) {
            socket.emit("newUser", username);
        }
    }

    // Mettre à jour la liste des utilisateurs
    socket.on("updateUserList", (users) => {
        userList.innerHTML = "";
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user;
            userList.appendChild(li);
        });
    });

    // Recevoir les messages
    socket.on("message", (data) => {
        const li = document.createElement("li");
        li.textContent = `${data.username}: ${data.message}`;
        messagesList.appendChild(li);
        messagesList.scrollTop = messagesList.scrollHeight; // Faire défiler vers le bas
    });

    // Envoyer un message
    sendButton.addEventListener("click", () => {
        const message = messageInput.value;
        if (message) {
            socket.emit("message", { username, message });
            messageInput.value = ""; // Réinitialiser le champ de message
        }
    });

    // Envoyer un message avec la touche "Entrée"
    messageInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });
});
// Son de notification
const notificationSound = new Audio('notification.mp3');

// Recevoir les messages
socket.on("message", (data) => {
    const li = document.createElement("li");
    li.textContent = `${data.username}: ${data.message}`;
    messagesList.appendChild(li);
    messagesList.scrollTop = messagesList.scrollHeight; // Faire défiler vers le bas
    notificationSound.play(); // Jouer le son de notification
});
