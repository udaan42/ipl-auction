import React from 'react';
import LeagueDetails from '../../components/league/LeagueDetails';
import { useHistory, useParams } from 'react-router-dom';
import { API_ENDPOINT } from '../../config/config';
import  getLeagueDetails  from '../../fetch/LeagueDetails';


const LeagueDetailsContainer = (props) => {

    const { id } = useParams();
    let leagueUsers = [];
    const url = `${API_ENDPOINT}/iplauction/league/${id}`;;
    const { data } = getLeagueDetails(url);

    return(
        <LeagueDetails standings={leagueUsers} detail={data} />
    )

}

export default LeagueDetailsContainer;