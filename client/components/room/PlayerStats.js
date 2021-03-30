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
import classnames from 'classnames';
import clsx from 'clsx';
import { API_ENDPOINT, USER_ID, JWT_TOKEN } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';

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
    },
    nextBidDetails: {
        margin: 15,
        paddingTop: 10,
        marginRight: 40
    },
    nextBidLabel: {
        fontWeight: 500
    },
    nextBid: {
        fontWeight: 600,
        fontSize: 16
    },
    stamp: {
        transform: 'rotate(12deg)',
        color: '#555',
        fontSize: '2rem',
        fontWeight: 700,
        border: '0.25rem solid #555',
        display: 'inline-block',
        padding: '0.25rem 0.25rem',
        textTransform: 'uppercase',
        borderRadius: '1rem',
        fontFamily: 'Courier',
        WebkitMaskImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png')",
        WebkitMaskSize: '944px 604px',
        mixBlendMode: "multiply",
        maxWidth: 800
    },
    isApproved: {
        color: "#0A9928",
        border: "0.5rem solid #0A9928",
        WebkitMaskPosition: "13rem 6rem",
        transform: "rotate(-14deg)",
        borderRadius: 0
    },
    isUnsold: {
            color: "#D23",
            border: "0.5rem double #D23",
            transform: "rotate(3deg)",
            WebkitMaskPosition: "2rem 3rem",
            fontSize: "2rem"
    },
    soldStampData: {
        position: "absolute",
        zIndex: 20,
        top: "30%",
        bottom: "auto",
        left: "30%",
        right: "auto"
    },
    unsoldStampData:{
        position: "absolute",
        zIndex: 20,
        top: "30%",
        bottom: "auto",
        left: "50%",
        right: "auto"
    }

};


class PlayerStats extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            nextBid: null,
            bidDetails: null,
            data: null
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.bidDetails !== nextProps.bidDetails) {
            let nextBid = null;
            if(nextProps.bidDetails){
                if(nextProps.bidDetails.currentBid < 100){
                    nextBid = nextProps.bidDetails.currentBid + 5;
                }else if(nextProps.bidDetails.currentBid >= 100 && nextProps.bidDetails.currentBid < 200){
                    nextBid = nextProps.bidDetails.currentBid + 10;
                }else if(nextProps.bidDetails.currentBid >= 200 && nextProps.bidDetails.currentBid < 500){
                    nextBid = nextProps.bidDetails.currentBid + 20;
                }else if(nextProps.bidDetails.currentBid >= 500 && nextProps.bidDetails.currentBid < 800){
                    nextBid = nextProps.bidDetails.currentBid + 25;
                }else{
                    nextBid = nextProps.bidDetails.currentBid + 50;
                }
            }
            return {
                bidDetails: nextProps.bidDetails,
                nextBid: nextBid
            };
        }

        if (prevState.data !== nextProps.data) {
            if(nextProps.data){
                return {
                    data: nextProps.data,
                    nextBid: nextProps.data.basePrice
                  }
            }
        }
    
        // Return null to indicate no change to state.
        return null;
    }


    submitBtn = () => {
        let data = {
            nextBid: this.state.nextBid,
            playerId: this.state.data.playerId
        }
        this.props.submitBid(data);
    }

    soldBtn = () => {

        let data = {
            nextBid: this.state.nextBid,
            playerId: this.state.data.playerId
        }
        console.log("Inside SOLD BUTTON")
        this.props.sellPlayer(data);
    }

    getNextBidDetails = (bidDetails) => {
        let nextBid = null;
        if(bidDetails){
            if(bidDetails.currentBid < 100){
                nextBid = bidDetails.currentBid + 5;
            }else if(bidDetails.currentBid >= 100 && bidDetails.currentBid < 200){
                nextBid = bidDetails.currentBid + 10;
            }else if(bidDetails.currentBid >= 200 && bidDetails.currentBid < 500){
                nextBid = bidDetails.currentBid + 20;
            }else if(bidDetails.currentBid >= 500 && bidDetails.currentBid < 800){
                nextBid = bidDetails.currentBid + 25;
            }else{
                nextBid = bidDetails.currentBid + 50;
            }
            return nextBid;
        }else{
            if(this.props.data){
                nextBid = this.props.data.basePrice;
            }
            return nextBid;
        }
    }

    getPrice = (value) => {
        
        if(value){
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
        
    }

    getTeamName = (id) => {
        let bidTeam = _.find(this.props.teams, ['userId', id]);
        return bidTeam.teamName;
    }

    getSoldDetails = () => {
        if(this.props.sold){
            if(this.props.soldData){
                if(this.props.soldData.playerOwnerUserId != 0){
                    return(
                        <div className={this.props.classes.soldStampData}>
                            <span className={clsx(this.props.classes.stamp, this.props.classes.isApproved)}>Sold to {this.getTeamName(this.props.soldData.playerOwnerUserId)} for {this.getPrice(this.props.soldData.currentBid)}</span>
                        </div>
                    )
                }else{
                    return (
                        <div className={this.props.classes.unsoldStampData}>
                            <span className={clsx(this.props.classes.stamp, this.props.classes.isUnsold)}>UNSOLD</span>
                        </div>
                    )
                }
            }
            // else{
            //     return (
            //         <div className={this.props.classes.unsoldStampData}>
            //             <span className={clsx(this.props.classes.stamp, this.props.classes.isUnsold)}>UNSOLD</span>
            //         </div>
            //     )
            // }
        }
    }

    checkDisabledBtn = () => {
        let disabled = false;
        
        if(this.props.bidDetails){
            return getLocalStorage(USER_ID) == this.props.bidDetails.playerOwnerUserId;
        }
        if(this.props.myTable){
            return this.props.myTable.playersSquad.length == 15
        }

        return disabled;

    }

    checkSquadBalance = () => {
        let balance = {
            "bat": 0,
            "bowl": 0,
            "ar": 0,
            "wk": 0
        }

        let check = false;

        if(this.props.myTable){
            this.props.myTable.playersSquad.map((player)=> {
                if(player.playerRole == "Bowler"){
                    balance.bowl++;
                }else if(player.playerRole == "Batsman"){
                    balance.bat++;
                }else if(player.playerRole == "All Rounder"){
                    balance.ar++;
                }else if(player.playerRole == "Wicket Keeper"){
                    balance.wk++
                }
            })
        }

        let currentPlayerRole = null

        if(this.props.data){
            currentPlayerRole = this.props.data.playerRole;
        }
        
        if(currentPlayerRole){
            if(currentPlayerRole == "Batsman"){
                if(balance.bat > 3){
                    check = true
                }
            }else if(currentPlayerRole == "Bowler"){
                if(balance.bowl > 4){
                    check = true
                }
            }else if(currentPlayerRole == "All Rounder"){
                if(balance.ar > 3){
                    check = true
                }
            }else if(currentPlayerRole == "Wicket Keeper"){
                if(balance.wk > 1){
                    check = true;
                }
            }
        }
        
        return check;
        
    }

    checkForeignPlayerQuota = () => {
        let indian = 0;
        let overseas = 0;
        let check = false;
        if(this.props.myTable){
            this.props.myTable.playersSquad.map((player)=> {
                if(player.playerRace == "I"){
                    indian++;
                }else if(player.playerRace == "F"){
                    overseas++;
                }
            })
        }

        if(this.props.data){
            if(this.props.data.playerRace == "I" && indian >= 10){
                check = true;
            }else if(this.props.data.playerRace == "F" && overseas >= 6){
                check = true;
            }
        }
        
        return check;
    }

    getModButton = () => {
        if(this.props.bidDetails){
            return(
                <Button variant="success" onClick={this.soldBtn} className={this.props.classes.bidBtnRaise}> Sold <LocalMallIcon className={this.props.classes.raise}/></Button>
            )
        }else{
            return(
                <Button variant="danger" onClick={this.soldBtn} className={this.props.classes.bidBtnFold}> Unsold <WarningIcon className={this.props.classes.thumbsdown}/></Button>
            )
        }

    }

    checkFoldDisabledBtn = () => {
        let disabled = false;
        
        if(this.props.bidDetails){
            return getLocalStorage(USER_ID) == this.props.bidDetails.playerOwnerUserId;
        }

        return disabled;

    }


    render(){

        const disabled = this.checkDisabledBtn() || this.checkSquadBalance() || this.checkForeignPlayerQuota() || this.props.sold || this.props.fold;
        const foldDisabled = this.props.sold || this.checkFoldDisabledBtn() || this.props.fold;
        
        const playerTableData = this.props.myTable ? this.props.myTable.playersSquad : [] 

        if(this.props.role == "player"){
            return(
                <Row>
                    <Col md={7} sm={12} className={this.props.classes.playerInfo}>
                        {(this.props.data)?<Container>
                            <PlayerDetails  teams={this.props.teams} bidDetails={this.props.bidDetails} data={this.props.data} />
                            {this.getSoldDetails()}
                            <Row>
                                <div className={this.props.classes.nextBidDetails}><span className={this.props.classes.nextBidLabel}> Next Bid - </span> <span className={this.props.classes.nextBid}>{this.getPrice(this.state.nextBid)}</span></div>
                                <Button variant="success" disabled={disabled} onClick={this.submitBtn} className={this.props.classes.bidBtnRaise}> Raise <PanToolIcon className={this.props.classes.raise}/></Button>
                                <Button variant="danger" disabled={foldDisabled} onClick={()=>{this.props.foldBtn()}} className={this.props.classes.bidBtnFold}> Fold <ThumbDownAltIcon className={this.props.classes.thumbsdown}/></Button>
                            </Row>
                        </Container>: ""}
                    </Col>
                    <Col md={2} sm={12}>
                        {this.props.bidHistory.length > 0 ? <LiveTicker bidHistory={this.props.bidHistory} teams={this.props.teams} /> : ""}
                    </Col>
                    <Col md={3} sm={12}>
                        <PlayerTable data= {playerTableData} />
                    </Col>
                </Row> 
            )
        }else{
            return(
                <Row>
                    <Col md={7} sm={12} className={this.props.classes.playerInfo}>
                        {(this.props.data)?<Container>
                            <PlayerDetails  teams={this.props.teams} bidDetails={this.props.bidDetails}  data={this.props.data} />
                            {this.getSoldDetails()}
                            <Row>
                                <div className={this.props.classes.nextBidDetails}><span className={this.props.classes.nextBidLabel}> Next Bid - </span> <span className={this.props.classes.nextBid}>{this.getPrice(this.state.nextBid)}</span></div>
                            
                                {this.getModButton()}
                                
                            </Row>
                        </Container>: ""}
                    </Col>
                    <Col md={3} sm={12}>
                        {this.props.bidHistory.length > 0 ? <LiveTicker bidHistory={this.props.bidHistory} teams={this.props.teams} /> : ""}
                    </Col>
                </Row> 
            )
        }
    }
}

export default (withStyles(styles)(PlayerStats));