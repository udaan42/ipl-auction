import React from 'react'
import { Button, Container, Image, Row, Col, Table} from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';

import LiveTicker from './LiveTicker';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import PanToolIcon from '@material-ui/icons/PanTool';
import WarningIcon from '@material-ui/icons/Warning';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import PlayerTable from './PlayerTable';
import PlayerDetails from './PlayerDetails';

const styles = {
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

};


class PlayerStats extends React.Component{

    constructor(props){
        super(props);
    }

    submitBtn = () => {
        this.props.submitBid();
    }

    soldBtn = () => {

        console.log("Inside SOLD BUTTON")
        this.props.sellPlayer();
    }

    render(){
        if(this.props.role == "player"){
            return(
                <Row>
                    <Col md={7} sm={12} className={this.props.classes.playerInfo}>
                        {(this.props.data)?<Container>
                            <PlayerDetails data={this.props.data} />
                            <Row>
                                <Button variant="success" onClick={this.submitBtn} className={this.props.classes.bidBtnRaise}> Raise <PanToolIcon className={this.props.classes.raise}/></Button>
                                <Button variant="danger" className={this.props.classes.bidBtnFold}> Fold <ThumbDownAltIcon className={this.props.classes.thumbsdown}/></Button>
                            </Row>
                        </Container>: ""}
                    </Col>
                    <Col md={2} sm={12}>
                        <LiveTicker bidHistory={this.props.bidHistory} />
                    </Col>
                    <Col md={3} sm={12}>
                        <PlayerTable />
                    </Col>
                </Row> 
            )
        }else{
            return(
                <Row>
                    <Col md={8} sm={12} className={this.props.classes.playerInfo}>
                        {(this.props.data)?<Container>
                            <PlayerDetails data={this.props.data} />
                            <Row>
                                <Button variant="success" onClick={this.soldBtn} className={this.props.classes.bidBtnRaise}> Sold <LocalMallIcon className={this.props.classes.raise}/></Button>
                                <Button variant="danger" className={this.props.classes.bidBtnFold}> Unsold <WarningIcon className={this.props.classes.thumbsdown}/></Button>
                            </Row>
                        </Container>: ""}
                    </Col>
                    <Col md={3} sm={12}>
                        <LiveTicker bidHistory={this.props.bidHistory} />
                    </Col>
                </Row> 
            )
        }
    }
}

export default (withStyles(styles)(PlayerStats));