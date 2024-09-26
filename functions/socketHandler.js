const io = require('socket.io')(3000, {
  cors: {
    origin: '*', // Autorise toutes les origines
    methods: ['GET', 'POST']
  }
});

exports.handler = async (event, context) => {
  // Le backend de gestion des messages avec Socket.io
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Socket.io is running!" }),
  };
};

io.on('connection', (socket) => {
  console.log('Nouvelle connexion :', socket.id);

  // Réception et envoi de message
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté');
  });
});
