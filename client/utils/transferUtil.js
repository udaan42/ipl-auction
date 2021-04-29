import { getLocalStorage } from './storageUtil';
import { API_ENDPOINT, USER_ID, JWT_TOKEN } from '../config/config';
import axios from 'axios';


export const requestTransfer = (data, leagueId) => {
    const url = `${API_ENDPOINT}/iplauction/league/addTransferRequest/${leagueId}`;
    const bearer_token = getLocalStorage(JWT_TOKEN);
    const bearer = 'Bearer ' + bearer_token;

    const headers = {
        'Authorization': bearer
    }

    axios.post(url, data, {
        headers: headers
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
}