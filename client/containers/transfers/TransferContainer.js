import React,  { useEffect, useState}  from 'react';
import Team from '../../components/transfers/Team';
import { useHistory, useParams } from 'react-router-dom';
import { API_ENDPOINT, USER_ID, JWT_TOKEN, API_URL } from '../../config/config';
import  getUnsoldPlayers  from '../../fetch/UnsoldPlayers';
import { getLocalStorage } from '../../utils/storageUtil';
import _ from 'lodash';
import  getLeagueDetails  from '../../fetch/LeagueDetails';
import { getTransfers, getLeagueTransfers } from '../../fetch/Transfers';

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

    const transfersURL = `${API_ENDPOINT}/iplauction/league/getUserTransferRequests`;
    
    const { transfers } = getTransfers(transfersURL, id, refresh);

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

    const updateUnsold = (value) => {
        let unsold = [...filteredPlayers];
        _.remove(unsold,['playerName', value]);
        setFilteredPlayers(unsold);
    }

    const addUnsold = (value) => {
        let unsold = [...filteredPlayers, ...value];
        setFilteredPlayers(unsold)
    }

    const refreshTransfers = () => {
        setRefresh(!refresh);
    }

    const lockTransfers = () => {
        const lockUrl = `${API_URL}transfers/${id}`;
        getLeagueTransfers(lockUrl);
    }

    return(
        <Team detail={myTeam} leagueId={id} id={leagueName} addUnsold={addUnsold} lockTransfers={lockTransfers}
            updateUnsold={updateUnsold} updateFilter={updateFilter} unsoldPlayers ={filteredPlayers} refreshTransfers={refreshTransfers} transfers={transfers}/>
    )

}

export default TransferContainer;