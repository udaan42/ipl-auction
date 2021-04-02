import React from 'react';
import MyTeams from '../../components/teams/MyTeams';

import { API_URL, API_ENDPOINT, USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import  getLeagueData  from '../../fetch/LeagueData';

export default function TeamsContainer(props) {

    let data = [];
    const url = `${API_URL}userLeagues`;
    let userId = getLocalStorage(USER_ID);
    data = getLeagueData(url, userId);

    return(
        <MyTeams list={data} />
    )   
}