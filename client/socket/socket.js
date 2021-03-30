import openSocket from 'socket.io-client';

const socket = openSocket();

export const joinAuctionRoom = (data) => {
  console.log(data);
  socket.emit('join-auction', data);
};

export const startAuction = (data) => {
  socket.emit('start-auction', data);
};

export const sellPlayer = (data) => {
  console.log('Received SELL DATA', data);
  socket.emit('sell-player', data);
};

export const playerSold = (cb) => {
  socket.on('player-sold', (data) => {
    return cb(null, data);
  });
};

export const onJoinRoom = (cb) => {
  socket.on('notification', (data) => {
    console.log(data);
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

export const getBidUpdates = (cb) => {
  socket.on('bid-updates', (data) => {
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
