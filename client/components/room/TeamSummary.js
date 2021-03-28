import React from 'react';
import { Button, Container, Image, Row, Col, Table} from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

const styles = {
    teamSummary:{
        marginTop: 15
    },
    tab:{
        backgroundColor: "#eee",
        textAlign: "center",
        padding: 10,
        fontSize: 13,
        border: "solid 1px #dedede",
        borderRadius: 3,
        marginRight: 15,
        fontFamily: '"Segoe UI"'
    }
}

const getPurseRemaining = (players) => {
    let total = 0;
    players.forEach(element => {
        total = total + element.soldPrice;
    });


    return (10000 - total) / 100;
}

const getModUI = (props) => {

    const handleClick = (data) => {
        props.onOpenPopup(data);
    }

    return(
        <Row md={4} lg={4} sm={4} xs={4}>
            {props.data.map((item, index)=> {
                if(item.leagueRole == "player"){
                    return(
                        <Col key={index} className={props.classes.tab} onClick={()=> {handleClick(item.playersSquad)}}>
                            <Typography variant="body2"> {item.userName}</Typography>
                            <Typography variant="body2"> {item.teamName}</Typography>
                            <Typography variant="body2"> Slots left- {15 - item.playersSquad.length}</Typography>
                            <Typography variant="body2"> Purse balance - {getPurseRemaining(item.playersSquad)} crores</Typography>
                        </Col>  
                    )
                }})}
        </Row>
    )
}


const getPlayerUI = (props) => {

    const handleClick = (data) => {
        props.onOpenPopup(data);
    }

    return(
        <Row md={7} lg={7} sm={7} xs={4}>
            {props.data.map((item, index)=> {
                if(item.leagueRole == "player"){
                    return(
                        <Col key={index} className={props.classes.tab} onClick={()=> {handleClick(item.playersSquad)}}>
                            <Typography variant="body2"> {item.userName}</Typography>
                            <Typography variant="body2"> {item.teamName}</Typography>
                            <Typography variant="body2"> Slots left- {15 - item.playersSquad.length}</Typography>
                            <Typography variant="body2"> Purse balance - {getPurseRemaining(item.playersSquad)} crores</Typography>
                        </Col>  
                    )
                }
            })}
        </Row>
    )
}

const TeamSummary = (props) => {
    
    return(
        <Container className={props.classes.teamSummary} fluid>
            {(props.role == "player")? getPlayerUI(props): getModUI(props)} 
        </Container>
    )
}

export default (withStyles(styles)(TeamSummary));