import { API_ENDPOINT, USER_ID, JWT_TOKEN } from '../config/config';
import { getLocalStorage } from './storageUtil';
import _ from 'lodash';

let data = [];
const url = `${API_ENDPOINT}/iplauction/player/all`;


const bearer_token = getLocalStorage(JWT_TOKEN);
const bearer = 'Bearer ' + bearer_token;
    fetch(url, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': bearer
        } })
        .then(async response => {
            const res = await response.json()
            data = res.payload.playerInfos;
        })
        .catch(error => {
        //fetch throws an error only on network failure or if anything prevented the request from completing
        })

export const getPlayerData = (id) => {
    let response = {
        "playerName": "",
        "playerId": id
    }
    let resPlayer = _.find(data, ['playerId', id]);
    if(resPlayer){
        return resPlayer
    }else{
        return response
    }
     
}