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

const getModUI = (props) => {

    return(
        <Row md={4} lg={4} sm={4} xs={4}>
            {props.data.map(()=> {
                return(
                    <Col className={props.classes.tab}>
                        <Typography variant="body2"> Player Name</Typography>
                        <Typography variant="body2"> Team name</Typography>
                        <Typography variant="body2"> Slots left- 4</Typography>
                        <Typography variant="body2"> Purse balance - 80 crores</Typography>
                    </Col>  
                )})}
        </Row>
    )
}

const getPlayerUI = (props) => {
    return(
        <Row md={7} lg={7} sm={7} xs={4}>
            {props.data.map(()=> {
                return(
                    <Col className={props.classes.tab}>
                        <Typography variant="body2"> Player Name</Typography>
                        <Typography variant="body2"> Team name</Typography>
                        <Typography variant="body2"> Slots left- 4</Typography>
                        <Typography variant="body2"> Purse balance - 80 crores</Typography>
                    </Col>  
                )})}
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