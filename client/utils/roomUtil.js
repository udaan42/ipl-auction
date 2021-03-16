
import { getLocalStorage } from './storageUtil';
import { API_ENDPOINT, USER_ID } from '../config/config';
import axios from 'axios';

export let getLeagueUsers = (url) => {
    let leagueUsers = [];
    // GET CALL
    return axios.get(url)
    // .then((response) => {
    //    console.log(response.data.payload)
    //    leagueUsers = response.data.payload.leagueInfo.leagueUser;
    //    console.log(leagueUsers);
    //    return leagueUsers;
    // })
    // .catch((error) => {
    //    console.log(error);
    //    return leagueUsers;
    // });
    
}

export let checkUserPresence = (id, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].userId == id) {
            return true;
        }
    }
    return false;
}

export let getID = () => {
  return getLocalStorage(USER_ID);
};

export let isAllowed = async (props) => {
    const leagueId = props.match.params.id;
    let leagueUsers = [];
    const url = `${API_ENDPOINT}iplauction/league/${leagueId}`;
    try{
       const leagueInfo = await getLeagueUsers(url);
       leagueUsers = leagueInfo.data.payload.leagueInfo.leagueUser;
    } catch(err){
        console.log(err);
    }
    
    return checkUserPresence(getID(), leagueUsers);
};
