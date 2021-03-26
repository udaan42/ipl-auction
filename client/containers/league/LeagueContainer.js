import React from 'react';
import League from '../../components/league/League';

import { API_ENDPOINT, USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import  getLeagueData  from '../../fetch/LeagueData';

export default function LeagueContainer(props) {

    let state = {
        leagues: []
    }

    let data = [];
    const url = `${API_ENDPOINT}iplauction/league/getUserLeagues`;
    const userId = getLocalStorage(USER_ID);
    data = getLeagueData(url, "e8c844ed-02c6-4962-aed3-b317c9ee1222");
    // data = getLeagueData(url, "2ee54e87-9652-4b04-8b1d-70323de443d1");

    return(
        <League list={data} leagues={state.leagues}/>
    )   
}