import React from 'react';
import League from '../../components/league/League';

const leagues = [{'id':1,'name': "Hifliers", "rank":"2", "role":"player"},
{'id':2,'name': "US", "rank":"N/A", "role":"player"},
{'id':3,'name': "Sastra", "rank":"N/A", "role":"moderator"}]

import { API_ENDPOINT, USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import axios from 'axios';
import  getLeagueData  from '../../fetch/LeagueData';

export default function LeagueContainer(props) {

    let state = {
        leagues: []
    }

    let data = [];
    const url = `${API_ENDPOINT}iplauction/league/getUserLeagues`;
    const userId = getLocalStorage(USER_ID);
    data = getLeagueData(url, "61994eeb-5d4e-48bf-9bd1-bd0fbb7e8125");

    return(
        <League list={data} leagues={state.leagues}/>
    )   
}