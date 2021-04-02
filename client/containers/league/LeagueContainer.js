import React from 'react';
import League from '../../components/league/League';

import { API_ENDPOINT, USER_ID, API_URL } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import  getLeagueData  from '../../fetch/LeagueData';

export default function LeagueContainer(props) {

    let state = {
        leagues: []
    }

    let data = [];
    const url = `${API_URL}userLeagues`;
    const userId = getLocalStorage(USER_ID);
    data = getLeagueData(url, userId);
    // data = getLeagueData(url, "2ee54e87-9652-4b04-8b1d-70323de443d1");

    return(
        <League list={data} leagues={state.leagues}/>
    )   
}