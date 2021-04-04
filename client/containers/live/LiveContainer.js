import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../config/config';
import  getLeagueDetails  from '../../fetch/LeagueDetails';
import Live from '../../components/live/Live';

const LiveContainer = (props) => {

    const { id } = useParams();
    const [refresh, setRefresh] = useState(false);
    let leagueUsers = [];
    const url = `${API_URL}leagues/${id}`;
    const { data , error } = getLeagueDetails(url, refresh);

    const reloadPage = () => {
        setRefresh(!refresh);
    }

    return(
        <Live reload={reloadPage} standings={leagueUsers} detail={data} />
    )

}

export default LiveContainer;