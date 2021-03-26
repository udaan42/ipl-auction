import React, { useState, useEffect } from 'react';
import Room from '../../components/room/Room';
import _ from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import { API_ENDPOINT, USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import  getLeagueDetails  from '../../fetch/LeagueDetails';
import getPlayerBagDetails from '../../fetch/PlayerBags';
import axios from 'axios';

const bagNumbers = [1,2,3,4,5,6,7,8,9,10];


const RoomsContainer = (props) => {

    const [refresh, setRefresh] = useState(false);
    const [index, setIndex] = useState(0);

    
    const { id } = useParams();
    const url = `${API_ENDPOINT}iplauction/league/${id}`;
    const { data, reload } = getLeagueDetails(url, refresh);

    const playerBagsURL =  `${API_ENDPOINT}iplauction/player/getPlayersBag`;
    const { players, bagNumber } = getPlayerBagDetails(playerBagsURL, bagNumbers[index]);
    
    const getNextBag = () => {
        setIndex(index + 1);
    }

    const sellPlayer = (data) => {

        if(data.playerOwnerUserId != 0){
            const url = `${API_ENDPOINT}iplauction/league/sellPlayerToUser/${data.playerId}/${data.currentBid}`;

            const headers = {
                'X-UserId': data.playerOwnerUserId,
                'X-LeagueId': id
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
        }else{
            setRefresh(!refresh);
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
            userId = "da6d833c-8416-48b3-8219-d8105c4e0831";
            loggedUser = _.find(data.leagueUsers, ['userId', userId]);
            return loggedUser
        }
        
    }

    let teams = getLeagueTeams();

    const playerDetail = getLoggedUserDetail();

    let currentBag = _.shuffle(players);
    return(
        <>
            <Room sellPlayer={sellPlayer} playerSet={players} detail={data} bag={bagNumber} loggedUser={playerDetail} teams={teams} getNextBag={getNextBag} />
        </>
    )

}

export default RoomsContainer;