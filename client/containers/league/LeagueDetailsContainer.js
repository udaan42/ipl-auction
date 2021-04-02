import React, { useState, useEffect } from 'react';
import LeagueDetails from '../../components/league/LeagueDetails';
import { useHistory, useParams } from 'react-router-dom';
import { API_ENDPOINT } from '../../config/config';
import  getLeagueDetails  from '../../fetch/LeagueDetails';


const LeagueDetailsContainer = (props) => {

    const { id } = useParams();
    const [refresh, setRefresh] = useState(false);
    let leagueUsers = [];
    const url = `${API_ENDPOINT}/iplauction/league/${id}`;;
    const { data , error } = getLeagueDetails(url, refresh);
    console.log(error);
    // if(error){
    //     setRefresh(!refresh)
    // }

    return(
        <LeagueDetails standings={leagueUsers} detail={data} />
    )

}

export default LeagueDetailsContainer;