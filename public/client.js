const socket = io();
let username = "";

// Capturar elementos del DOM
const usernameContainer = document.getElementById("usernameContainer");
const usernameInput = document.getElementById("usernameInput");
const chatBox = document.getElementById("chatBox");
const form = document.getElementById("form");
const input = document.getElementById("messageInput");
const messages = document.getElementById("messages");

// Función para establecer el nombre de usuario
function setUsername() {
    username = usernameInput.value.trim();
    if (username) {
        socket.emit("set username", username);
        usernameContainer.style.display = "none";
        chatBox.style.display = "block";
    } else {
        alert("Por favor, ingresa un nombre válido.");
    }
}

// Enviar mensaje con el nombre de usuario
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", { user: username, text: input.value });
        input.value = ""; // Limpiar el input
    }
});

// Recibir y mostrar mensajes con el nombre de usuario
socket.on("chat message", (msg) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
    messages.appendChild(li);
});
