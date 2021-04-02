import React, { useState, useEffect } from 'react';
import Room from '../../components/room/Room';
import _ from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import { API_ENDPOINT, USER_ID, JWT_TOKEN, BAG } from '../../config/config';
import { getLocalStorage, setLocalStorage, clearLocalStorage } from '../../utils/storageUtil';
import  getLeagueDetails  from '../../fetch/LeagueDetails';
import getPlayerBagDetails from '../../fetch/PlayerBags';
import axios from 'axios';

const bagNames = ["BA1","BW1","WK1","AR1","BW2","BA2","AR2","BW3","WK2","BA3","BW4", "AR3", "BW5", "AR4", "BA4", "WK3", "AR5","BW6","BW7", "AR6", "BA5","WK4", "AR7","BW8"];
let bagNumbers = [];
for (let i=1; i<=24; i++){
    bagNumbers.push(i);
}

const RoomsContainer = (props) => {

    const [refresh, setRefresh] = useState(false);
    const [index, setIndex] = useState(0);
    const [unsold, setUnsold] = useState(false);
    const history = useHistory();
    
    const { id } = useParams();
    const key = `${BAG}#${id}`;
    const bagName = `bagName#${id}`;

    let bagCacheIndex = getLocalStorage(key);

    if(bagCacheIndex){
        if(bagCacheIndex != index){
            setIndex(bagCacheIndex);
        }  
    }
    
    
    const url = `${API_ENDPOINT}/iplauction/league/${id}`;
    const { data, reload, error } = getLeagueDetails(url, refresh);

    const playerBagsURL =  `${API_ENDPOINT}/iplauction/player/getPlayersBag`;
    const { players, bagNumber } = getPlayerBagDetails(playerBagsURL, bagNumbers[index]);
    
    const getNextBag = () => {
        if(index < bagNumbers.length - 1){
            setLocalStorage(key, index + 1);
            setIndex(index + 1);
        }
        if(index == bagNumbers.length - 1){
            setUnsold(true);
        }

    }

    const sellPlayer = (player) => {

        if(player.playerOwnerUserId != 0){
            let userId = getLocalStorage(USER_ID);
            let user = _.find(data.leagueUsers, ['userId', userId]);
            console.log(user);
            if(user.leagueRole == "moderator"){
                const bearer_token = getLocalStorage(JWT_TOKEN);
                const bearer = 'Bearer ' + bearer_token;
                const url = `${API_ENDPOINT}/iplauction/league/sellPlayerToUser/${player.playerId}/${player.currentBid}`;

                const headers = {
                    'X-UserId': player.playerOwnerUserId,
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
                    setRefresh(!refresh);
                    console.log(error);
                });
            }else{
                setTimeout(setRefresh(!refresh),4000);
            }

        }
        
    }

    const getLeagueTeams = () => {
        let teams = [];
        if(data){
            data.leagueUsers.map((user)=> {
                let temp = {
                    userId: user.userId,
                    teamName: user.teamName,
                    userName: user.userName
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

    const onEndAuction = () => {

        let userId = getLocalStorage(USER_ID);
        let user = _.find(data.leagueUsers, ['userId', userId]);
        const bagNameKey = `bagName#${id}`;
        const bagData = `bagData#${id}`;

        if(user.leagueRole == "moderator"){
            clearLocalStorage(key);
            clearLocalStorage(bagNameKey);
            clearLocalStorage(bagData);
            let url = `/leagues/${data.leagueId}`
            history.push(url);
        }else{
            let url = `/my-teams/${data.leagueId}`
            history.push(url)
        }
        
    }

    if(error){
        setTimeout(setRefresh(!refresh),4000);
    }

    const refreshData = () => {
        setRefresh(!refresh);
    }

    let teams = getLeagueTeams();

    const playerDetail = getLoggedUserDetail();

    return(
        <>
            <Room refresh={refreshData} endAuction={onEndAuction} currentBag={bagNames[index]} nextBag={bagNames[index+1]} sellPlayer={sellPlayer} playerSet={players} detail={data} bag={bagNumber} loggedUser={playerDetail} teams={teams} getNextBag={getNextBag} />
        </>
    )

}

export default RoomsContainer;