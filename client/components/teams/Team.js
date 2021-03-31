import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TeamTable from './TeamTable';
import _ from 'lodash';
import {Button} from 'react-bootstrap';

const styles = {
    header:{
        fontWeight: 500
    },
    subHeader: {

    }
    
};

function createData(name, team, role, points) {
    return { name, team, role, points };
}

const rows = [
    createData('Sachin Tendulkar', "MI", "Bat", 67),
    createData('Ricky Ponting', "MI", "Bat", 51),
    createData('Brian Lara', "MI", "Bat", 24),
    createData('Yuvraj yoghurt', "MI", "Bat", 24),
    createData('MS Dhoni', "MI", "Bat", 49),
    createData('Stephen Fleming', "MI", "Bat", 87),
    createData('Ice cream sandwich', "MI", "Bat", 37),
    createData('Nathan Astle', "MI", "Bat", 94),
    createData('Chris Gayle', "MI", "Bat", 65),
    createData('Random Player1234', "MI","Bat", 98),
    createData('Testing player', "MI","Bat", 81),
    createData('Virat Kohli', "MI", "Bat", 9),
    createData('Rohit Sharma', "MI", "Bat", 63),
    createData('Rahul Sharma', "MI", "Bat", 63),
    createData('Mohit Sharma', "MI", "Bat", 63),
];

class Team extends React.Component{

    constructor(props){
        super(props)
        this.state={
            squad: rows,
            team: [],
            tempSquad: rows,
            tempTeam: []
        }
    }

    onSquadSelect = (item) => {
        let tempSquad = [...this.state.tempSquad];
        let tempTeam = [...this.state.tempTeam];
        const selectedIndex = _.findIndex(tempTeam, ['name', item]);
        
        console.log(selectedIndex);

        let newSelected = [];
        if (selectedIndex === -1) {
            
            const selectedItem = _.find(tempSquad, ['name', item]);
            newSelected = newSelected.concat(tempTeam, selectedItem);
            _.remove(tempSquad,['name', item]);

        } else if (selectedIndex === 0) {

            const selectedItem = _.find(tempTeam, ['name', item]);
            newSelected = newSelected.concat(tempTeam.slice(1));
            tempSquad.push(selectedItem);

        } else if (selectedIndex === tempTeam.length - 1) {

            const selectedItem = _.find(tempTeam, ['name', item]);
            newSelected = newSelected.concat(tempTeam.slice(0, -1));
            tempSquad.push(selectedItem);

        } else if (selectedIndex > 0) {

            const selectedItem = _.find(tempTeam, ['name', item]);
            newSelected = newSelected.concat(
                tempTeam.slice(0, selectedIndex),
                tempTeam.slice(selectedIndex + 1),
            );
            tempSquad.push(selectedItem);
        }

        this.setState({
            tempSquad: tempSquad,
            tempTeam: newSelected
        })

    }

    onTeamSelect = (item) => {
        
        let tempSquad = [...this.state.tempSquad];
        let tempTeam = [...this.state.tempTeam];
        const selectedIndex = _.findIndex(tempSquad, ['name', item]);

        let newSelected = [];
        if (selectedIndex === -1) {
            
            const selectedItem = _.find(tempTeam, ['name', item]);
            newSelected = newSelected.concat(tempSquad, selectedItem);
            _.remove(tempTeam,['name', item]);

        } else if (selectedIndex === 0) {

            const selectedItem = _.find(tempSquad, ['name', item]);
            newSelected = newSelected.concat(tempSquad.slice(1));
            tempTeam.push(selectedItem);

        } else if (selectedIndex === tempSquad.length - 1) {

            const selectedItem = _.find(tempSquad, ['name', item]);
            newSelected = newSelected.concat(tempSquad.slice(0, -1));
            tempTeam.push(selectedItem);

        } else if (selectedIndex > 0) {

            const selectedItem = _.find(tempSquad, ['name', item]);
            newSelected = newSelected.concat(
                tempSquad.slice(0, selectedIndex),
                tempSquad.slice(selectedIndex + 1),
            );
            tempTeam.push(selectedItem);
        }

        this.setState({
            tempTeam: tempTeam,
            tempSquad: newSelected
        })
    }

    moveRight = () => {
        let sortedSquad = _.sortBy(this.state.tempSquad, 'name');
        let sortedTeam = _.sortBy(this.state.tempTeam, 'name');
        this.setState({
            squad: sortedSquad,
            team: sortedTeam
        })
    }

    render(){
        if(this.props.detail.leagueRole == "player"){
            return(
                <Container fluid>
                    <Row>
                        <Typography className={this.props.classes.header} variant="h5"> My Team </Typography>
                    </Row>
                    <Row>
                        <Typography className={this.props.classes.subHeader} variant="subtitle1"> League Name - {this.props.id} </Typography>   
                    </Row>
                    <Row>
                        <Typography className={this.props.classes.subHeader} variant="subtitle1"> Team Name - {this.props.detail.teamName} </Typography>
                    </Row>
                    <Row>
                        <Col md={5}>
                            <TeamTable rows={this.state.squad} itemSelect={this.onSquadSelect}/>
                        </Col>
                        <Col md={2}>
                            <Button onClick={this.moveRight}>
                                >>
                            </Button>
                        </Col>
                        <Col md={5}>
                            <TeamTable rows={this.state.team} itemSelect={this.onTeamSelect}/>
                        </Col>
                    </Row>
                </Container>
            )
        }else{
            return(
                <Container fluid>
                    <Row>
                        <Typography className={this.props.classes.header} variant="h5"> My Team </Typography>
                    </Row>
                    <Row>
                        <Typography className={this.props.classes.subHeader} variant="subtitle1"> League Name - {this.props.id} </Typography>   
                    </Row>
                    <Row>
                        <Typography className={this.props.classes.subHeader} variant="subtitle1"> You are a moderator for this league. No team selection available </Typography>
                    </Row>
                </Container>
            )
        }
        
    }
}

export default (withStyles(styles)(Team));