import openSocket from 'socket.io-client';

const socket = openSocket();

export const joinAuctionRoom = (data) => {
  socket.emit('join-auction', data);
};

export const joinTransfersRoom = (data) => {
  socket.emit('join-transfers', data);
}

export const startAuction = (data) => {
  socket.emit('start-auction', data);
};

export const endAuction = (data) => {
  socket.emit('end-auction', data);
};

export const sellPlayer = (data) => {
  socket.emit('sell-player', data);
};

export const playerSold = (cb) => {
  socket.on('player-sold', (data) => {
    return cb(null, data);
  });
};

export const onJoinRoom = (cb) => {
  socket.on('notification', (data) => {
    return cb(null, data);
  });
};

export const onJoinTransfers = (cb) => {
  socket.on('transfers-joined-result', (data) => {
    return cb(null, data);
  })
}

export const onEndAuction = (cb) => {
  socket.on('auction-ended', (data) => {
    return cb(null, data);
  });
};

export const messageTestListen = (cb) => {
  socket.on('new event from server', (data) => {
    return cb(null, data);
  });
};

export const getAuctionStatus = (cb) => {
  socket.on('auction-started', (data) => {
    console.log('Received auction status');
    return cb(null, data);
  });
};

export const getRoomDetails = (cb) => {
  socket.on('room-status', (data) => {
    console.log('Received room details');
    return cb(null, data);
  });
};

export const setNextPlayer = (data) => {
  socket.emit('next-player', data);
};

export const getCurrentPlayerData = (cb) => {
  socket.on('current-player', (data) => {
    return cb(null, data);
  });
};

export const submitBid = (data) => {
  socket.emit('submit-bid', data);
};

export const submitTransferBid = (data) => {
  socket.emit('transfers-new-bid', data);
};

export const getBidUpdates = (cb) => {
  socket.on('bid-updates', (data) => {
    return cb(null, data);
  });
};

export const getTransferBidUpdates = (cb) => {
  socket.on('transfer-bid-updates', (data) => {
    return cb(null, data);
  });
};

export const foldBid = (data) => {
  socket.emit('fold-bid', data);
};

export const getFoldUpdates = (cb) => {
  socket.on('fold-updates', (data) => {
    return cb(null, data);
  });
};

// Remember to disconnect the socket once you unmount
export const disconnect = () => {
  socket.emit('leave-auction', "");
};
