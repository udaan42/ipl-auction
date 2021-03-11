import React from 'react';
import League from '../../components/league/League';

const leagues = [{'id':1,'name': "Hifliers", "rank":"2", "role":"player"},
{'id':2,'name': "US", "rank":"N/A", "role":"player"},
{'id':3,'name': "Sastra", "rank":"N/A", "role":"moderator"}]

import { API_ENDPOINT } from '../../config/config';

class LeagueContainer extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const url = `${API_ENDPOINT}iplauction/league/all`;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.payload.leagueInfos);
        })
        .catch(console.log)
    }

    render(){
        return(
            <League list={leagues} />
        )
    }
}

export default LeagueContainer;