const { get, set, exists, keys } = require("./config/redis");

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

    const liveUserExsistsInAuctionRoom = auctionRoomLiveUsers.findIndex(userId => userId === data.userId);
    if (liveUserExsistsInAuctionRoom === -1) {
      auctionRoomLiveUsers.push(data.userId);
      await updateAuctionLiveUsersInCache(data.roomId, auctionRoomLiveUsers);
    }
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
  });

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

  socket.on('end-auction', async (data) => {
    console.log("End Auction ------->");
    console.log(data);
    const newObject = { roomId: data.roomId, isActive: false, currentPlayerInBid: null };
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

  socket.on('new-auction-chat', async (data) => {
    updateAuctionRoomChatInCache(socket.roomId, socket.userId, data.message);
    io.in(socket.roomId).emit('auction-chat-notification', data.message);
  });

  socket.on('fetch-auction-chat-history', async () => {
    const chatDataFromCache = await get('AR#' + roomId + '#CHAT');
    let chatData;
    if (chatDataFromCache) {
      const parsedChatObject = JSON.parse(chatDataFromCache);
      chatData = parsedChatObject.chat;
    }
    else {
      chatData = [];
    }
    io.in(socket.roomId).emit('auction-chat-history', chatData);
  });

  socket.on('join-transfers', async (data) => {
    console.log("--------------------->> User joined transfer room");
    console.log(data);
    socket.join(data.roomId + 'TRANSFERS');
    socket.userId = data.userId;
    socket.roomId = data.roomId + 'TRANSFERS';
    //const tranferRoomDetails = await fetchRoomSpecificTransferKeyFromCache(data.roomId);
    const tranferRoomDetails = await fetchRoomSpecificPlayerTransfersFromCache(data.roomId);
    await createRoomSpecificPlayerTransfersTransactionsCache(data.roomId);
    io.in(data.roomId + 'TRANSFERS').emit('transfers-joined-result', tranferRoomDetails);
  });

  socket.on('transfers-new-bid', async (data) => {
    console.log("Transfers New Bid Submitted ------->");
    console.log(data);
    let bidedPlayerInTransfer = await checkIfBidedPlayerForTransferExistsInCache(data.roomId, data.playerId);
    if (bidedPlayerInTransfer) {
      if (data.nextBid > bidedPlayerInTransfer.currentBid) {
        bidedPlayerInTransfer.currentBid = data.nextBid;
        bidedPlayerInTransfer.bidHistory.push({ userId: data.userId, bid: data.nextBid, time: Date.now() });
        bidedPlayerInTransfer.playerOwnerUserId = data.userId;
        bidedPlayerInTransfer.sold = null;
        bidedPlayerInTransfer.playerId = data.playerId;

      }
    } else {
      bidedPlayerInTransfer = {
        currentBid: data.nextBid,
        playerOwnerUserId: data.userId,
        sold: null,
        bidHistory: [{ userId: data.userId, bid: data.nextBid, time: Date.now() }],
        playerId: data.playerId
      };
    }
    await set('AR:' + data.roomId + ':TRANSFERS:' + data.playerId, JSON.stringify(bidedPlayerInTransfer));
    io.in(data.roomId + 'TRANSFERS').emit('transfer-bid-updates', bidedPlayerInTransfer);
  });

  socket.on('freeze-transfers', async (data) => {
    console.log("--------------------->> Freeze transfers");
    console.log(data);
    const tranferRoomDetails = await fetchRoomSpecificPlayerTransfersFromCache(data.roomId);
    io.in(data.roomId + 'TRANSFERS').emit('transfers-freezed', tranferRoomDetails);
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

  async function updateAuctionRoomChatInCache(roomId, userId, message) {
    const chatKeyExists = await exists('AR#' + roomId + '#CHAT');
    if (!chatKeyExists) {
      const data = { chat: [] };
      await set('AR#' + roomId + '#CHAT', JSON.stringify(data));
    } else {
      const chatData = await get('AR#' + roomId + '#CHAT');
      if (chatData) {
        const parsedChatObject = JSON.parse(chatData);
        if (parsedChatObject.chat.length > 100) {
          parsedChatObject.chat.shift();
          parsedChatObject.chat.push({ userId: userId, message: message });
          await set('AR#' + roomId + '#CHAT', JSON.stringify(parsedChatObject));
        }
      }
    }
  }

  // async function fetchRoomSpecificTransferKeyFromCache(roomId) {
  //   const keyExists = await exists('AR#' + roomId + '#TRANSFERS');
  //   if (!keyExists) {
  //     const data = [];
  //     await set('AR#' + roomId + '#TRANSFERS', JSON.stringify(data));
  //     return [];
  //   } else {
  //     const result = await get('AR#' + roomId + '#TRANSFERS');
  //     const parsedResult = JSON.parse(result);
  //     console.log(parsedResult);
  //     return parsedResult;
  //   }
  // }

  async function fetchRoomSpecificPlayerTransfersFromCache(roomId) {
    const allMatchingKeys = await keys('AR:' + roomId + ':TRANSFERS:*');
    let roomSpecificPlayerTransferDetails = [];
    if (allMatchingKeys && allMatchingKeys.length > 0) {
      for (let i = 0; i < allMatchingKeys.length; i++) {
        const result = await get(allMatchingKeys[i]);
        const parsedResult = JSON.parse(result);
        roomSpecificPlayerTransferDetails.push(parsedResult);
      }
    }
    return roomSpecificPlayerTransferDetails;
  }

  // async function checkIfBidedPlayerExistsInCache(roomId, playerId) {
  //   const transferRoomDetails = await get('AR#' + roomId + '#TRANSFERS');
  //   const transferRoomDetailsparsedResult = JSON.parse(transferRoomDetails);
  //   console.log(transferRoomDetailsparsedResult);
  //   if (transferRoomDetails.length > 0) {
  //     const matchedPlayerDetails = transferRoomDetails.filter(players => players.playerId === playerId);
  //     if (matchedPlayerDetails)
  //       return matchedPlayerDetails;
  //   }
  //   return null;
  // }

  async function checkIfBidedPlayerForTransferExistsInCache(roomId, playerId) {
    const transferBidPlayerDetails = await exists('AR:' + roomId + ':TRANSFERS:' + playerId);
    if (transferBidPlayerDetails === 1) {
      const transferBidPlayerDetailsParsed = JSON.parse(transferBidPlayerDetails);
      console.log(transferBidPlayerDetailsParsed);
      return transferBidPlayerDetailsParsed;
    }
    return null;
  }

  // async function updateBidedPlayerDetailsInCache(roomId, playerBidDetails) {
  //   console.log(playerBidDetails)
  //   await set('AR#' + roomId + '#TRANSFERS', JSON.stringify(playerBidDetails));
  // }

  async function fetchRoomSpecificPlayerTransfersTransactionsFromCache(roomId) {
    const playerTransactions = await get('AR:' + roomId + ':TRANSFERS-TRANSACTION');
    if (playerTransactions) {
      const parsedPlayerTransactionObject = JSON.parse(playerTransactions);
      return parsedPlayerTransactionObject;
    }
  }

  async function checkIfRoomSpecificPlayerTransfersTransactionsExistsInCache(roomId) {
    const result = await exists('AR:' + roomId + ':TRANSFERS-TRANSACTION');
    console.log(result)
    return result;
  }

  async function createRoomSpecificPlayerTransfersTransactionsCache(roomId) {
    if (! await checkIfRoomSpecificPlayerTransfersTransactionsExistsInCache(roomId)) {
      await set('AR:' + roomId + ':TRANSFERS-TRANSACTION', []);
    }
  }

  // async function insertIntoRoomSpecificPlayerTransfersTransactionsCache(roomId) {
  //   const roomTransferTransactions = await fetchRoomSpecificPlayerTransfersTransactionsFromCache(roomId);
  //   if (roomTransferTransactions && roomTransferTransactions.length > 0) {

  //   }
  // }



}