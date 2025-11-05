const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // dossier pour les fichiers HTML/CSS/JS

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // renvoie à tous les clients
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur s’est déconnecté');
  });
});

server.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});