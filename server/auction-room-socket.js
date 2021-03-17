module.exports = function (io, socket) {

  socket.on('create auction', (room) => {
    socket.join(room);
    console.log('moderator created ', room);
  });

  socket.on('join auction', room, user => {
    console.log(user, " joined ", room);
    socket.join(room);
  });

  socket.on('emit back', (data) => {
    console.log(data, " received");
    io.in(data.roomId).emit('new event from server', data.msg);
    //in case you want to emit to everyone in room except sender
    //socket.to(data.roomId).emit('new event from server', data.msg);
  });

};