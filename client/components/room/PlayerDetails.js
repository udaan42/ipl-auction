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

const PlayerDetails = (props) => {
    const classes = useStyles();

    return(
            <Row>
                <Col xs={6} md={4} className="player-image">
                    <Image src="https://www.espncricinfo.com/inline/content/image/501527.html?" height="175px" width="200px" rounded  fluid  />
                </Col>
                <Col md={8} xs={6} className={classes.playerInfoView}>
                    <Row className={classes.playerDetailsRow}>
                        Name: <span className={classes.playerData}> {props.data.Player} </span>
                    </Row>
                    <Row className={classes.playerDetailsRow}>
                        Team: <span className={classes.playerData}> {props.data.team} </span>
                    </Row>
                    <Row className={classes.playerDetailsRow}>
                        Role: <span className={classes.playerData}> {props.data.Role} </span>
                    </Row>
                    <Row className={classes.playerDetailsRow}>
                        Category: <span className={classes.playerData}> {props.data.type} </span>
                    </Row>
                    <Row className={classes.playerDetailsRow}>
                        Base Price: <span className={classes.playerData}> {props.data.Price} </span>
                    </Row>
                    <Row className={classes.playerDetailsRow}>
                        Current Price: <span className={classes.playerData}> 4 crores </span>
                    </Row>
                </Col>
                <Col md={12} sm={12} className={classes.playerStatsTable}>
                    <Row className={classes.playerDetailsStatsTitle}>
                        <span className={classes.statsTitle}> {props.data.stats} Career Statistics </span>
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
                                    <td>{props.data.Mat}</td>
                                    <td>{props.data.Runs}</td>
                                    <td>{props.data.HS}</td>
                                    <td>{props.data.BatAv}</td>
                                    <td></td>
                                    <td>{props.data.Hundreds}</td>
                                    <td>{props.data.Wkts}</td>
                                    <td>{props.data.BowlAv}</td>
                                    <td></td>
                                    <td>{props.data.FvWkts}</td>
                                    <td>{props.data.Ct}</td>
                                    <td>{props.data.St}</td>
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
