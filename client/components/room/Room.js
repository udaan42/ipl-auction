import React from 'react';
import {Button} from 'react-bootstrap';
import { API_URL, JWT_TOKEN, USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import axios from 'axios';
import PlayerStats from './PlayerStats';

class Room extends React.Component{

    handleClick = () => {
        // GET CALL
        // fetch('/api/rooms/1')
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log(data);
        // })
        // .catch(console.log)

        const data = {
            "userId": getLocalStorage(USER_ID),
            "leagueId": "1"
        }

        // POST CALL
        axios.post(API_URL + 'room', data)
        .then((response) => {
           console.log(response)
        })
        .catch((error) => {
           console.log(error);
        });
    }

    render(){
        return(
            <div>
                <Button onClick={this.handleClick} variant="secondary">
                    Join Auction
                </Button>

                <Button onClick={this.handleClick}>
                    Start Auction
                </Button>
                <div>
                    <PlayerStats />
                </div>
                
            </div>
        )
    }
}

export default Room;