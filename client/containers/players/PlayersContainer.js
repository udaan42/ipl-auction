import React from 'react';
import Players from '../../components/players/Players';

import { API_ENDPOINT, USER_ID } from '../../config/config';
import  getPlayersDetails  from '../../fetch/Players';

export default function PlayersContainer(props) {

    let data = [];
    const url = `${API_ENDPOINT}/iplauction/player/all`;
    data = getPlayersDetails(url);

    return(
        <Players list={data}/>
    )   
}
