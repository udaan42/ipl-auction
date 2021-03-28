const { get, set, exists } = require("./config/redis");


module.exports = function (io, socket) {

  socket.on('create auction', (room) => {
    socket.join(room);
    console.log('moderator created ', room);
  });

  socket.on('joinAuction', async (data) => {
    console.log("--------------------->> User joined room");
    console.log(data);
    socket.join(data.roomId);
    io.in(data.roomId).emit('notification', `${data.user} joined the room`);
    const roomStatus = await fetchAuctionDetailsFromCache(data);
    io.in(data.roomId).emit('room-status', roomStatus);
    if(roomStatus.currentPlayerInBid){
      const playerBidDetails = await fetchCurrentBidForPlayerFromCache(data.roomId, roomStatus.currentPlayerInBid.playerId);
      if(playerBidDetails.currentBid > 0){
        io.in(data.roomId).emit('bid-updates', playerBidDetails);
      }
    }
    
    // Emit Room details only to the user to who has joined; Maintain the room active status here
  });

  socket.on('emit back', (data) => {
    console.log(data, " received");
    io.in(data.roomId).emit('new event from server', data.msg);
    //in case you want to emit to everyone in room except sender
    //socket.to(data.roomId).emit('new event from server', data.msg);
  });

  socket.on('start-auction', async (data) => {
    console.log("Start Auction ------->");
    console.log(data);
    await insertAuctionDetailsInCache(data);
    io.in(data.roomId).emit('auction-started', data);
  });

  socket.on('next-player', async (data) => {
    console.log("Next Player Details ------->");
    console.log(data);
    const checkPlayer = await checkIfCurrentPlayerExistsFromCache(data.roomId, data.player.playerId);
    if(checkPlayer == 1){
      const playerBidDetails = await fetchCurrentBidForPlayerFromCache(data.roomId, data.player.playerId);
      io.in(data.roomId).emit('bid-updates', playerBidDetails);
      await updateAuctionDetailsInCache(data.roomId, data.player);
      io.in(data.roomId).emit('current-player', data.player);
    }else{
      const promiseArray = [];
      promiseArray.push(createAuctionRoomPlayerKeyInCache(data.roomId, data.player.playerId));
      promiseArray.push(updateAuctionDetailsInCache(data.roomId, data.player));
      await Promise.all(promiseArray);
      io.in(data.roomId).emit('current-player', data.player);
    }
    
  });

  socket.on('submit-bid', async (data) => {
    console.log("New Bid Submitted ------->");
    console.log(data);
    const playerBidDetails = await fetchCurrentBidForPlayerFromCache(data.roomId, data.playerId);
    if (data.nextBid > playerBidDetails.currentBid) {
      playerBidDetails.currentBid = data.nextBid;
      playerBidDetails.bidHistory.push({ userId: data.userId, bid: data.nextBid, time: Date.now() });
      playerBidDetails.playerOwnerUserId = data.userId;
      await updateAuctionRoomPlayerKeyInCache(data.roomId, data.playerId, playerBidDetails);
      io.in(data.roomId).emit('bid-updates', playerBidDetails);
    }
  });

  socket.on('end-auction', async (roomId) => {
    console.log("End Auction ------->");
    console.log(data);
    const newObject = { roomId: roomId, isActive: false };
    await updateAuctionDetailsInCache(newObject);
    io.in(data.roomId).emit('auction-ended', newObject);
  });

  socket.on('sell-player', async (data) => {
    console.log(data.playerId, " sold to ", data.userId);
    let playerId = data.playerId;
    const playerBidDetails = await fetchCurrentBidForPlayerFromCache(data.roomId, data.playerId);
    let soldData = {...playerBidDetails, playerId};
    io.in(data.roomId).emit('player-sold', soldData);
    //in case you want to emit to everyone in room except sender
    //socket.to(data.roomId).emit('new event from server', data.msg);
  });

  async function insertAuctionDetailsInCache(data) {
    await set('AR#' + data.roomId, JSON.stringify(data));
  }

  async function updateAuctionDetailsInCache(roomId, player) {
    const newObject = { roomId: roomId, isActive: true, currentPlayerInBid: player };
    await set('AR#' + roomId, JSON.stringify(newObject));
  }

  async function fetchAuctionDetailsFromCache(data) {
    const result = await get('AR#' + data.roomId);
    const parsedResult = JSON.parse(result);
    console.log(parsedResult);
    return parsedResult;
  }

  async function createAuctionRoomPlayerKeyInCache(roomId, playerId) {
    const value = { currentBid: 0, playerOwnerUserId: 0, bidHistory: [] };
    await set('AR#' + roomId + 'PID#' + playerId, JSON.stringify(value));
  }

  async function fetchCurrentBidForPlayerFromCache(roomId, playerId) {
    const result = await get('AR#' + roomId + 'PID#' + playerId);
    const parsedResult = JSON.parse(result);
    console.log(parsedResult);
    return parsedResult;
  }

  async function checkIfCurrentPlayerExistsFromCache(roomId, playerId) {
    const result = await exists('AR#' + roomId + 'PID#' + playerId);
    console.log(result)
    return result;
  }

  async function updateAuctionRoomPlayerKeyInCache(roomId, playerId, playerBidDetails) {
    const value = { currentBid: 0, playerOwnerUserId: 0, bidHistory: [] };
    await set('AR#' + roomId + 'PID#' + playerId, JSON.stringify(playerBidDetails));
  }

};