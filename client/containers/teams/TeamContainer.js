import React from 'react';
import Team from '../../components/teams/Team';
import { useHistory, useParams } from 'react-router-dom';
import { API_ENDPOINT, USER_ID } from '../../config/config';
import  getLeagueDetails  from '../../fetch/LeagueDetails';
import { getLocalStorage } from '../../utils/storageUtil';
import _ from 'lodash';


const TeamContainer = (props) => {

    const { id } = useParams();
    let myTeam = [];
    const url = `${API_ENDPOINT}iplauction/league/${id}`;;
    const {data} = getLeagueDetails(url);
    let userId = getLocalStorage(USER_ID); 
    userId = "61994eeb-5d4e-48bf-9bd1-bd0fbb7e8125";
    let leagueName = "";

    if(data){
        myTeam = _.find(data.leagueUsers, ['userId', userId]);
        leagueName = data.leagueName;
    }

    return(
        <Team detail={myTeam} id={leagueName} />
    )

}

export default TeamContainer;