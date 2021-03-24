const { get, set } = require("./config/redis");


module.exports = function (io, socket) {

  socket.on('create auction', (room) => {
    socket.join(room);
    console.log('moderator created ', room);
  });

  socket.on('joinAuction', (data) => {
    console.log("--------------------->> User joined room");
    console.log(data);
    socket.join(data.room);
    socket.emit('notification', `${data.user} joined the room`);
    io.in(data.room).emit('notification', `${data.user} joined the room`);

    // Emit Room details only to the user to who has joined; Maintain the room active status here
  });

  socket.on('emit back', (data) => {
    console.log(data, " received");
    io.in(data.roomId).emit('new event from server', data.msg);
    //in case you want to emit to everyone in room except sender
    //socket.to(data.roomId).emit('new event from server', data.msg);
  });

  socket.on('start-auction', (data) => {
    console.log("Start Auction ------->");
    console.log(data);
    insertAuctionDetailsInCache(data);
    console.log('out of the call back');
    io.in(data.roomId).emit('auction-started', data);
  });

  socket.on('next-player', (data) => {
    console.log("Next Player Details ------->");
    console.log(data);
    io.in(data.roomId).emit('current-player', data.player);
  })

  socket.on('submit-bid', (data) => {
    console.log("New Bid Submitted ------->");
    console.log(data);
    async () => {
      const currentBidDetials = await get('AuctionRoom#' + data.roomId + 'Player#');
      if (data.bid > currentBidDetials.bidAmount) {
        // emit to the user BID accepted and to other then most recent value
      }
    };
    io.in(data.roomId).emit('bid-updates', data.bid);
  })

  const insertAuctionDetailsInCache = async (data) => {
    console.log('before await');
    await set('AuctionRoom#' + data.roomId, JSON.stringify(data));
    console.log('post await');
  };

};