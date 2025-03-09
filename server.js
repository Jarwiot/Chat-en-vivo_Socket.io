const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// Objeto para almacenar los nombres de usuario asociados a los sockets
const users = {};

io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado:", socket.id);

    // Guardar el nombre de usuario cuando se establece
    socket.on("set username", (username) => {
        users[socket.id] = username;
        console.log(`${username} se ha unido al chat.`);
    });

    // Manejar mensajes de chat
    socket.on("chat message", (msg) => {
        const user = users[socket.id] || "Anónimo";
        io.emit("chat message", { user, text: msg.text });
    });

    // Eliminar usuario cuando se desconecta
    socket.on("disconnect", () => {
        console.log(`${users[socket.id] || "Un usuario"} se ha desconectado.`);
        delete users[socket.id];
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
