import openSocket from 'socket.io-client';

const socket = openSocket('http://127.0.0.1:3001');

export const joinAuctionRoom = (data) => {
  socket.emit('joinAuction', data)
}

export const startAuction = (data) => {
    socket.emit('start-auction', data);
}

export const messageListen = (cb) => {
  socket.on('notification', data => {
    return cb(null, data);
  });
}

export const messageTestListen = (cb) => {
    socket.on('new event from server', data => {
        return cb(null, data);
    });
}

export const getAuctionStatus = (cb) => {
    socket.on('auction-started', data => {
        console.log("Received auction status")
        return cb(null, data);
    });
}

export const setNextPlayer = (data) => {
    socket.emit('next-player', data)
}

export const getCurrentPlayerData = (cb) => {
    socket.on('current-player', data => {
        return cb(null, data);
    });
}

export const submitBid = (data) => {
    socket.emit('submit-bid', data);
}

export const getBidUpdates = (cb) => {
    socket.on('bid-updates', data => {
        return cb(null, data);
    });
}

// Remember to disconnect the socket once you unmount
export const disconnect = () => {
    socket.disconnect();
}
