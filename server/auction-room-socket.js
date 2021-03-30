const { get, set, exists } = require("./config/redis");

let foldedArray = [];

module.exports = function (io, socket) {

  socket.on('join-auction', async (data) => {
    console.log("--------------------->> User joined room");
    console.log(data);
    socket.join(data.roomId);
    socket.userId = data.userId;
    socket.roomId = data.roomId;
    let auctionRoomLiveUsers = await fetchAuctionLiveUsersFromCache(data.roomId);
    console.log(auctionRoomLiveUsers);
    auctionRoomLiveUsers.push(data.userId);
    await updateAuctionLiveUsersInCache(data.roomId, auctionRoomLiveUsers);
    io.in(data.roomId).emit('notification', auctionRoomLiveUsers);

    let auctionRoomDetails = await fetchAuctionDetailsFromCache(data);
    if (!auctionRoomDetails) {
      auctionRoomDetails = { roomId: data.roomId, isActive: false, currentPlayerInBid: null };
    }
    io.in(data.roomId).emit('room-status', auctionRoomDetails);
    if (auctionRoomDetails.currentPlayerInBid) {
      const playerBidDetails = await fetchCurrentBidForPlayerFromCache(data.roomId, auctionRoomDetails.currentPlayerInBid.playerId);
      console.log("Player BID DETAILS ----->", playerBidDetails);
      if (playerBidDetails.sold) {
        let playerId = auctionRoomDetails.currentPlayerInBid.playerId;
        let soldData = { ...playerBidDetails, playerId };
        io.in(data.roomId).emit('player-sold', soldData);
      } else {
        io.in(data.roomId).emit('bid-updates', playerBidDetails);
      }
    }

    socket.on('fold-bid', (data) => {
      console.log(data.userId, "folded");
      foldedArray.push(data);
      io.in(data.roomId).emit('fold-updates', data.userId);
    })

    socket.on('fold-reset', (data) => {
      foldedArray = [];
      io.in(data.roomId).emit('fold-updates', foldedArray);
    })

    socket.on('start-auction', async (data) => {
      console.log("Start Auction ------->");
      console.log(data);
      await insertAuctionDetailsInCache(data.roomId, true);
      io.in(data.roomId).emit('auction-started', data);
    });

    socket.on('next-player', async (data) => {
      console.log("Next Player Details ------->");
      console.log(data);
      const playerExists = await checkIfCurrentPlayerExistsInCache(data.roomId, data.player.playerId);
      if (playerExists == 1) {
        const playerBidDetails = await fetchCurrentBidForPlayerFromCache(data.roomId, data.player.playerId);
        console.log(playerBidDetails)
        if (playerBidDetails.sold) {
          let playerId = data.player.playerId;
          let sold = { sold: true };
          let soldData = { ...playerBidDetails, playerId, ...sold };
          console.log(soldData);
          io.in(data.roomId).emit('player-sold', soldData);
        } else {
          io.in(data.roomId).emit('bid-updates', playerBidDetails);
        }
        await updateAuctionDetailsInCache(data.roomId, data.player);
        io.in(data.roomId).emit('current-player', data.player);
      } else {
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
      let playerBidDetails = await fetchCurrentBidForPlayerFromCache(data.roomId, data.playerId);
      if (data.nextBid > playerBidDetails.currentBid) {
        playerBidDetails.currentBid = data.nextBid;
        playerBidDetails.bidHistory.push({ userId: data.userId, bid: data.nextBid, time: Date.now() });
        playerBidDetails.playerOwnerUserId = data.userId;
        playerBidDetails.sold = null;
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
      console.log(data.playerId, " sold to ", data);
      let playerId = data.playerId;
      let playerBidDetails = await fetchCurrentBidForPlayerFromCache(data.roomId, data.playerId);
      playerBidDetails.sold = true;
      let soldData = { ...playerBidDetails, playerId };
      await updateAuctionRoomPlayerKeyInCache(data.roomId, data.playerId, playerBidDetails);
      io.in(data.roomId).emit('player-sold', soldData);
      //in case you want to emit to everyone in room except sender
      //socket.to(data.roomId).emit('new event from server', data.msg);
    });

    socket.on('leave-auction', async () => {
      console.log('disconnecting');
      let auctionRoomLiveUsers = await fetchAuctionLiveUsersFromCache(socket.roomId);
      auctionRoomLiveUsers = auctionRoomLiveUsers.filter(userId => userId !== socket.userId);
      console.log('filtered auction room', auctionRoomLiveUsers);
      await updateAuctionLiveUsersInCache(socket.roomId, auctionRoomLiveUsers);
      io.in(socket.roomId).emit('notification', auctionRoomLiveUsers);
    });

    async function insertAuctionDetailsInCache(roomId, active) {
      console.log(data);
      const newObject = { roomId: roomId, isActive: active, currentPlayerInBid: null };
      await set('AR#' + roomId, JSON.stringify(newObject));
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
      const value = { currentBid: 0, playerOwnerUserId: 0, sold: null, bidHistory: [] };
      await set('AR#' + roomId + 'PID#' + playerId, JSON.stringify(value));
    }

    async function fetchCurrentBidForPlayerFromCache(roomId, playerId) {
      const result = await get('AR#' + roomId + 'PID#' + playerId);
      const parsedResult = JSON.parse(result);
      console.log(parsedResult);
      return parsedResult;
    }

    async function checkIfCurrentPlayerExistsInCache(roomId, playerId) {
      const result = await exists('AR#' + roomId + 'PID#' + playerId);
      console.log(result)
      return result;
    }

    async function updateAuctionRoomPlayerKeyInCache(roomId, playerId, playerBidDetails) {
      console.log(playerBidDetails)
      await set('AR#' + roomId + 'PID#' + playerId, JSON.stringify(playerBidDetails));
    }

    async function updateAuctionLiveUsersInCache(roomId, liveUsers) {
      console.log('update called', liveUsers);
      const data = { users: liveUsers };
      await set('AR#' + roomId + '#USERS', JSON.stringify(data));
    }

    async function fetchAuctionLiveUsersFromCache(roomId) {
      if (await checkIfAuctionLiveUsersKeyExistsInCache(roomId)) {
        const liveUsersObject = await get('AR#' + roomId + '#USERS');
        if (liveUsersObject) {
          const parsedLiveUsersObject = JSON.parse(liveUsersObject);
          return parsedLiveUsersObject.users;
        }
      }
      console.log('key not present');
      return [];
    }

    async function checkIfAuctionLiveUsersKeyExistsInCache(roomId) {
      const result = await exists('AR#' + roomId + '#USERS');
      console.log(result)
      return result;
    }

  });
}