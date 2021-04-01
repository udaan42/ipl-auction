import React,  { useState}  from 'react';
import Team from '../../components/teams/Team';
import { useHistory, useParams } from 'react-router-dom';
import { API_ENDPOINT, USER_ID, JWT_TOKEN } from '../../config/config';
import  getLeagueDetails  from '../../fetch/LeagueDetails';
import { getLocalStorage } from '../../utils/storageUtil';
import _ from 'lodash';
import axios from 'axios';


const TeamContainer = (props) => {

    const [refresh, setRefresh] = useState(false);
    const { id } = useParams();
    let myTeam = [];
    const url = `${API_ENDPOINT}/iplauction/league/${id}`;;
    const { data, reload} = getLeagueDetails(url, refresh);
    let userId = getLocalStorage(USER_ID); 
    let leagueName = "";
    

    if(data){
        myTeam = _.find(data.leagueUsers, ['userId', userId]);
        leagueName = data.leagueName;
    }

    const submitUpdatedSquad = (data) => {
        const bearer_token = getLocalStorage(JWT_TOKEN);
        const bearer = 'Bearer ' + bearer_token;
        const url = `${API_ENDPOINT}/iplauction/league/updateTeamSquad`;
        console.log(data);

        const headers = {
            'Authorization': bearer,
            'X-UserId': userId,
            'X-LeagueId': id
        }
        // POST CALL
        axios.put(url, data, {
            headers: headers
        })
        .then((response) => {
            console.log(response);
            setRefresh(!refresh);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return(
        <Team updateSquad={submitUpdatedSquad} detail={myTeam} id={leagueName} />
    )

}

export default TeamContainer;