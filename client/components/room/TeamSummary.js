import React from 'react';
import { Button, Container, Image, Row, Col, Table} from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

const styles = {
    teamSummary:{
        marginTop: 15
    },
    tab:{
        backgroundColor: "#C8D8E6",
        textAlign: "left",
        padding: 10,
        fontSize: 13,
        border: "solid 1px #dedede",
        borderRadius: 10,
        marginRight: 15,
        fontFamily: '"Segoe UI"',
        marginTop: 20
    },
    values: {
        fontWeight: 600
    },
    active: {
        color: "green",
        float: "right",
        marginTop: -15,
        fontSize: 20,
        marginRight: -5,
        textShadow: "1px 0px lightgreen"
    },
    folded: {
        color: "darkred",
        float: "right",
        marginTop: -15,
        fontSize: 20,
        marginRight: -5,
        textShadow: "1px 0px indianred"
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

    const getActiveStatus =(id) => {
        if(props.foldedArray.includes(id)){
            return (<span className={props.classes.folded}>●</span>)
        }else{
            return (<span className={props.classes.active}>●</span>)
        }
    }

    return(
        <Row>
            {props.data.map((item, index)=> {
                if(item.leagueRole == "player"){
                    return(
                        <Col md={3} sm={3} xs={3} key={index}  onClick={()=> {handleClick(item.playersSquad)}}>
                            <div key={item.userId} className={props.classes.tab}>
                                {getActiveStatus(item.userId)}
                                <Typography variant="body2"> {item.userName}</Typography>
                                <Typography variant="body2"> <span className={props.classes.values}>{item.teamName}</span></Typography>
                                <Typography variant="body2"> Slots left- <span className={props.classes.values}>{15 - item.playersSquad.length}</span></Typography>
                                <Typography variant="body2"> Purse balance - <span className={props.classes.values}>{getPurseRemaining(item.playersSquad)} crores</span></Typography>
                            </div>
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

    const getActiveStatus =(id) => {
        if(props.foldedArray.includes(id)){
            return (<span className={props.classes.folded}>●</span>)
        }else{
            return (<span className={props.classes.active}>●</span>)
        }
    }

    return(
        <Row>
            {props.data.map((item, index)=> {
                if(item.leagueRole == "player"){
                    return(
                        <Col md={3} sm={3} xs={3} key={index}  onClick={()=> {handleClick(item.playersSquad)}}>
                            <div className={props.classes.tab}>
                                {getActiveStatus(item.userId)}
                                <Typography variant="body2"> {item.userName}</Typography>
                                <Typography variant="body2"> <span className={props.classes.values}>{item.teamName}</span></Typography>
                                <Typography variant="body2"> Slots left- <span className={props.classes.values}>{15 - item.playersSquad.length}</span></Typography>
                                <Typography variant="body2"> Purse balance - <span className={props.classes.values}>{getPurseRemaining(item.playersSquad)} crores</span></Typography>
                            </div>                          
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