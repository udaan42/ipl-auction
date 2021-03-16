module.exports = function (socket) {

  socket.on('create auction', (room) => {
    socket.join(room);
    console.log('moderator created ', room);
  });

  socket.on('join auction', (room, user) => {
    console.log(user, " joined ", room);
    socket.join(room);
  });

};