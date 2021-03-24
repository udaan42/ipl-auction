import React from 'react';
import MyTeams from '../../components/teams/MyTeams';

import { API_ENDPOINT, USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import  getLeagueData  from '../../fetch/LeagueData';

export default function TeamsContainer(props) {

    let data = [];
    const url = `${API_ENDPOINT}iplauction/league/getUserLeagues`;
    let userId = getLocalStorage(USER_ID);
    userId = "61994eeb-5d4e-48bf-9bd1-bd0fbb7e8125";
    data = getLeagueData(url, userId);
    // data = getLeagueData(url, "2ee54e87-9652-4b04-8b1d-70323de443d1");

    return(
        <MyTeams list={data} />
    )   
}