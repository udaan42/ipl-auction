import React, { useState, useEffect } from 'react';
import Room from '../../components/room/Room';
import _ from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import { API_ENDPOINT, USER_ID, JWT_TOKEN } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import  getLeagueDetails  from '../../fetch/LeagueDetails';
import getPlayerBagDetails from '../../fetch/PlayerBags';
import axios from 'axios';

const bagNumbers = [1,2,3,4,5,6,7,8,9,10];


const RoomsContainer = (props) => {

    const [refresh, setRefresh] = useState(false);
    const [index, setIndex] = useState(0);
    const [unsold, setUnsold] = useState(false);

    
    const { id } = useParams();
    const url = `${API_ENDPOINT}/iplauction/league/${id}`;
    const { data, reload } = getLeagueDetails(url, refresh);

    const playerBagsURL =  `${API_ENDPOINT}/iplauction/player/getPlayersBag`;
    const { players, bagNumber } = getPlayerBagDetails(playerBagsURL, bagNumbers[index]);
    
    const getNextBag = () => {
        if(index < bagNumbers.length - 1){
            setIndex(index + 1);
        }
        if(index == bagNumbers.length - 1){
            setUnsold(true);
        }

    }

    const sellPlayer = (data) => {
        console.log(data);

        if(data.playerOwnerUserId != 0){
            const bearer_token = getLocalStorage(JWT_TOKEN);
            const bearer = 'Bearer ' + bearer_token;
            const url = `${API_ENDPOINT}/iplauction/league/sellPlayerToUser/${data.playerId}/${data.currentBid}`;

            const headers = {
                'X-UserId': data.playerOwnerUserId,
                'X-LeagueId': id,
                'Authorization': bearer
            }
            // POST CALL
            axios.post(url, {}, {
                headers: headers
            })
            .then((response) => {
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        
    }

    const getLeagueTeams = () => {
        let teams = [];
        if(data){
            data.leagueUsers.map((user)=> {
                let temp = {
                    userId: user.userId,
                    teamName: user.teamName
                }
                teams.push(temp);
            })
        }
        return teams;
    }

    const getLoggedUserDetail = () => {
        let loggedUser = null
        if(data){
            let userId = getLocalStorage(USER_ID);
            loggedUser = _.find(data.leagueUsers, ['userId', userId]);
            return loggedUser
        }
        
    }

    let teams = getLeagueTeams();

    const playerDetail = getLoggedUserDetail();

    let currentBag = _.shuffle(players);
    return(
        <>
            <Room sellPlayer={sellPlayer} playerSet={currentBag} detail={data} bag={bagNumber} loggedUser={playerDetail} teams={teams} getNextBag={getNextBag} />
        </>
    )

}

export default RoomsContainer;