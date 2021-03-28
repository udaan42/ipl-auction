import React from 'react';
import { Button, Row, Col, Container, Image, Table } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    playerDetailsRow: {
        marginBottom: 13,
        fontSize: 15
    },
    playerData: {
        fontWeight: 700,
        marginLeft: 10
    },
    playerTable: {
        marginTop: 5
    },
    playerInfo: {
        marginTop: 25
    },
    statsTitle:{
        fontWeight: 700,
    },
    playerDetailsStatsTitle: {
        fontSize: 16,
        marginTop: 12
    },
    playerStatsTable: {
        paddingLeft: 30,
        // marginTop: 20
    },
    playerInfoView: {
        paddingLeft: 0
    },
    playersTeam: {
        fontSize: 16,
        fontWeight: 600,
        // marginBottom: 15
    },
    yourTable: {
        marginTop: 10
    },
    purseDetails:{
        marginTop: 10,
        fontWeight: 500,
        fontSize: 18
    },
    overseasIcon: {
        fontSize: "small"
    },
    bidBtnRaise: {
        margin: 15,
        width: 150,
        marginRight: 40,
        backgroundColor: "#207a38",
        borderColor: "#207a38",
        '&:hover': {
            background: "#207a38",
            borderColor: "#207a38",
         }
    },
    bidBtnFold: {
        margin: 15,
        width: 150,
        marginRight: 40,
        backgroundColor: "#871d12",
        borderColor: "#871d12",
        '&:hover': {
            background: "#871d12",
            borderColor: "#871d12",
         }
    },
    thumbsdown: {
        fontSize: "medium",
        paddingBottom: 2
    },
    raise: {
        fontSize: "medium",
        paddingBottom: 2
    }
}));

const getPrice = (value) => {
    if(value < 100){
        return `${value} lakhs`
    }else if(value >= 100){

       let currency = value / 100;
       if(currency == 1){
           return `1 crore`
       }else{
           return `${currency} crores`
       }
    }
}



const PlayerDetails = (props) => {

    const getCurrentPrice = () => {
        if(props.bidDetails && props.bidDetails.currentBid > 0){
            return getPrice(props.bidDetails.currentBid);
        }
    }

    const getBiddingTeam = () => {
        if(props.bidDetails){
            let bidTeam = _.find(props.teams, ['userId', props.bidDetails.playerOwnerUserId]);
            if(bidTeam){
                return bidTeam.teamName;
            }
            
        }
    }

    const classes = useStyles();

    return(
            <Row>
                <Col xs={6} md={4} className="player-image">
                    <Image src="https://auction-fantasy-images.s3.amazonaws.com/avatar-placeholder.png" height="175px" width="200px" rounded  fluid  />
                </Col>
                <Col md={8} xs={6} className={classes.playerInfoView}>
                    <Row className={classes.playerDetailsRow}>
                        Name: <span className={classes.playerData}> {props.data.playerName} </span>
                    </Row>
                    <Row className={classes.playerDetailsRow}>
                        Team: <span className={classes.playerData}> {props.data.teamName} </span>
                    </Row>
                    <Row className={classes.playerDetailsRow}>
                        Role: <span className={classes.playerData}> {props.data.playerRole} </span>
                    </Row>
                    <Row className={classes.playerDetailsRow}>
                        Category: <span className={classes.playerData}> {props.data.playerRace} </span>
                    </Row>
                    <Row className={classes.playerDetailsRow}>
                        Base Price: <span className={classes.playerData}> {getPrice(props.data.basePrice)} </span>
                    </Row>
                    <Row className={classes.playerDetailsRow}>
                        Current Price: <span className={classes.playerData}> {getCurrentPrice()} </span>
                    </Row>
                    <Row className={classes.playerDetailsRow}>
                        Bid Team: <span className={classes.playerData}> {getBiddingTeam()} </span>
                    </Row>
                </Col>
                <Col md={12} sm={12} className={classes.playerStatsTable}>
                    <Row className={classes.playerDetailsStatsTitle}>
                        <span className={classes.statsTitle}> {props.data.statType} Career Statistics </span>
                    </Row>
                    <Row className={classes.playerDetailsRow}>
                        <div className="table-responsive">
                        <Table striped w-auto bordered hover size="sm" className={classes.playerTable} >
                            <thead>
                                <tr>
                                    <th scope="col">Matches</th>
                                    <th scope="col">Runs</th>
                                    <th scope="col">High Score</th>
                                    <th scope="col">Bat avg.</th>
                                    <th scope="col">Strike rate</th>
                                    <th scope="col">50s</th>
                                    <th scope="col">Wickets</th>
                                    <th scope="col">Bowl avg.</th>
                                    <th scope="col">Economy</th>
                                    <th scope="col">5 wkts</th>
                                    <th scope="col">Catches</th>
                                    <th scope="col">Stumpings</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.data.matchesPlayed}</td>
                                    <td>{props.data.runsScored}</td>
                                    <td>{props.data.highestScore}</td>
                                    <td>{props.data.battingAverage}</td>
                                    <td>{props.data.battingStrikeRate}</td>
                                    <td>{props.data.noOfFifties}</td>
                                    <td>{props.data.noOfWickets}</td>
                                    <td>{props.data.bowlingAverage}</td>
                                    <td>{props.data.bowlingEconomy}</td>
                                    <td>{props.data.noOfFiveWickets}</td>
                                    <td>{props.data.noOfCatches}</td>
                                    <td>{props.data.noOfStumpings}</td>
                                </tr>
                            </tbody>
                        </Table> 
                        </div>   
                    </Row>
                </Col>
            </Row>
    )
}

export default PlayerDetails;
