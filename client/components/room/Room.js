import React from 'react';
import { Button } from 'react-bootstrap';
import { API_URL, JWT_TOKEN, USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import axios from 'axios';
import PlayerStats from './PlayerStats';
import io from 'socket.io-client';

class Room extends React.Component {
  handleClick = () => {
    // GET CALL
    // fetch('/api/rooms/1')
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data);
    // })
    // .catch(console.log)

    const data = {
      userId: getLocalStorage(USER_ID),
      leagueId: '1',
    };

    // POST CALL
    axios.post(API_URL + 'room/1', data).then(
      (response) => {
        if (response.status === 201) {
          this.socket = io('http://localhost:3000');
          this.roomId = 1;
          this.socket.emit('create auction', this.roomId);
          this.socket.on('new event from server', (msg) => {
            alert(msg);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  emitHandler = () => {
    const emitHandlerData = { roomId: this.roomId, msg: 'hello' };
    this.socket.emit('emit back', emitHandlerData);
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick} variant="secondary">
          Join Auction
        </Button>

        <Button onClick={this.handleClick}>Start Auction</Button>
        <Button onClick={this.emitHandler}>Emit Auction</Button>
        <div>
          <PlayerStats />
        </div>
      </div>
    );
  }
}

export default Room;
