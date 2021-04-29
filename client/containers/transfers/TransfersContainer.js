import React from 'react';
import Transfers from '../../components/transfers/Transfers';

import { API_URL, API_ENDPOINT, USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import  getLeagueData  from '../../fetch/LeagueData';

export default function TransfersContainer(props) {

    let data = [];
    const url = `${API_URL}userLeagues`;
    let userId = getLocalStorage(USER_ID);
    data = getLeagueData(url, userId);

    return(
        <Transfers list={data} />
    )   
}