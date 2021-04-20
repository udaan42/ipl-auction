import React,  { useEffect, useState}  from 'react';
import Team from '../../components/transfers/Team';
import { useHistory, useParams } from 'react-router-dom';
import { API_ENDPOINT, USER_ID, JWT_TOKEN, API_URL } from '../../config/config';
import  getUnsoldPlayers  from '../../fetch/UnsoldPlayers';
import { getLocalStorage } from '../../utils/storageUtil';
import _ from 'lodash';
import axios from 'axios';
import  getLeagueDetails  from '../../fetch/LeagueDetails';


const TransferContainer = (props) => {

    const [refresh, setRefresh] = useState(false);
    const { id } = useParams();
    let myTeam = [];
    const url = `${API_ENDPOINT}/iplauction/league/getUnsoldPlayers`;
    const { players } = getUnsoldPlayers(url, id);

    const leagueUrl = `${API_URL}leagues/${id}`;;
    const { data, reload} = getLeagueDetails(leagueUrl, refresh);
    let userId = getLocalStorage(USER_ID); 
    let leagueName = "";
    
    const [filteredPlayers, setFilteredPlayers] = useState(players);
    

    if(data){
        myTeam = _.find(data.leagueUsers, ['userId', userId]);
        leagueName = data.leagueName;
    }

    useEffect(()=>{
        setFilteredPlayers(players);
    }, [players])

    const updateFilter = (value)=> {
        if(value){
            if(value.category == "Role"){
                let unsold = [...players].filter((item) => (item.playerRole == value.title));
                setFilteredPlayers(unsold);
            }else if(value.category == "Team"){
                let unsold = [...players].filter((item) => (item.teamName == value.title));
                setFilteredPlayers(unsold);
            }
        }else{
            setFilteredPlayers(players);
        }
    }

    return(
        <Team detail={myTeam} leagueId={id} id={leagueName} updateFilter={updateFilter} unsoldPlayers ={filteredPlayers}/>
    )

}

export default TransferContainer;