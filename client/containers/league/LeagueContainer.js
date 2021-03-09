import React from 'react';
import League from '../../components/league/League';

const leagues = [{'id':1,'name': "Hifliers", "rank":"2", "role":"player"},
{'id':2,'name': "US", "rank":"N/A", "role":"player"},
{'id':3,'name': "Sastra", "rank":"N/A", "role":"moderator"}]

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