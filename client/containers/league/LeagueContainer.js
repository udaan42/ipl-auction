import React from 'react';
import League from '../../components/league/League';

const leagues = [{'name': "Hifliers", "rank":"2", "role":"player"},
{'name': "US", "rank":"N/A", "role":"player"},
{'name': "Sastra", "rank":"N/A", "role":"moderator"}]

class LeagueContainer extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <League list={leagues} />
        )
    }
}

export default LeagueContainer;