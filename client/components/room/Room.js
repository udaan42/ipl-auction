import React from 'react';
import { Button } from 'react-bootstrap';
import { API_URL, JWT_TOKEN, USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import axios from 'axios';
import PlayerStats from './PlayerStats';
import TeamSummary from './TeamSummary';
import ModeratorZone from './ModeratorZone';
import _ from 'lodash';
import { joinAuctionRoom, messageListen, messageTestListen, startAuction, getCurrentPlayerData, 
    getAuctionStatus, setNextPlayer, submitBid, getBidUpdates, getRoomDetails, sellPlayer, playerSold } from '../../socket/socket';

class Room extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            role: "moderator",
            isActive: false,
            currentPlayer: null,
            auctionSummary: null,
            currentIndex: 0,
            bidDetails: null,
            sold: false,
            soldData: null
        }
    }

    componentDidMount(){
        this.getUserRole();
        this.enterAuctionRoom();

        messageListen((err, data) => {
            console.log("Message from the Backend: ");
            console.log(data);
        });
        messageTestListen((err, data) => {
            console.log("Interval");
            console.log(data)
        });

        getCurrentPlayerData((err, data) => {
            this.setState({
                currentPlayer: data,
                sold: false,
                soldData: null
            })
        });

        getAuctionStatus((err, data) => {
            this.setState({
                isActive: data.isActive
            })
        });

        getRoomDetails((err, data) => {
            this.setState({
                isActive: data.isActive
            })
        })

        getBidUpdates((err, data) => {
            this.setState({
                bidDetails: data
            })
        })

        playerSold((err, data) => {
            this.setState({
                bidDetails: null,
                sold: true,
                soldData: data
            })
            this.props.sellPlayer(data);
        })

    }
  
    enterAuctionRoom = () => {
        if(this.props.detail){
            const data = {
                userId: getLocalStorage(USER_ID),
                roomId: this.props.detail.leagueId,
            };
            joinAuctionRoom(data);
        }
    };

    bidBtnClick = val => {
        let data = {
            userId: "da6d833c-8416-48b3-8219-d8105c4e0831",
            roomId: this.props.detail.leagueId,
            nextBid: val.nextBid,
            playerId: val.playerId
        }
        submitBid(data);
    }

    makeBid = _.debounce(this.bidBtnClick, 500)

    handleStartButton = () => {

        const data = {
            isActive: true,
            roomId: this.props.detail.leagueId
        }

        startAuction(data);
    }

    getUserRole = () => {
        let userId = getLocalStorage(USER_ID);
        if(userId == '2'){
            userId = "e8c844ed-02c6-4962-aed3-b317c9ee1222";
        }else{
            // Mod ID
            userId = "df9caece-92a8-4eee-b237-7fc2f1e39e87";
        }
            
        let user = {}
        if(!_.isEmpty(this.props.detail)){
            user = _.find(this.props.detail.leagueUsers, ['userId', userId]);
            if(this.state.role != user.leagueRole){
                this.setState({
                    role: user.leagueRole
                })
            }
        }
    }

    getActionButtons = () => {
        if(this.state.role == "moderator"){
            return (
                <Button onClick={this.handleStartButton}>Start Auction</Button>
            )
        }
    }

    getPlayer = () => {
        if(this.state.currentIndex < this.props.playerSet.length){
            const data = {
                roomId: this.props.detail.leagueId,
                player: this.props.playerSet[this.state.currentIndex]
            }
            setNextPlayer(data);
            this.setState({
                currentIndex: this.state.currentIndex + 1
            })
        }
    }

    getNextBag = () => {
        this.props.getNextBag();
        const data = {
            roomId: this.props.detail.leagueId,
            player: null
        }
        setNextPlayer(data);
        this.setState({
            currentIndex: 0
        })
    }

    soldBtnClicked = (val) => {

        let data = {
            roomId: this.props.detail.leagueId,
            nextBid: val.nextBid,
            playerId: val.playerId
        }
        sellPlayer(data);

        // this.props.sellPlayer();
    }


    getAuctionUI = () => {
        const playersRemaining = this.props.playerSet.length - this.state.currentIndex;
        const bidHistory = (this.state.bidDetails) ? this.state.bidDetails.bidHistory : [];
        if(this.state.role=="moderator"){
            return(
                <div>
                    <ModeratorZone submitPlayer={this.getPlayer} playersRemaining={playersRemaining} nextBag={this.getNextBag}/>
                    <PlayerStats myTable={this.props.loggedUser} sold={this.state.sold} soldData={this.state.soldData} sellPlayer={this.soldBtnClicked} teams={this.props.teams} data={this.state.currentPlayer} bidHistory={bidHistory} bidDetails={this.state.bidDetails} role={this.state.role} />
                    <TeamSummary data={this.props.detail.leagueUsers} role={this.state.role} />
                </div> 
            )
        }else{
            return(
                <div>
                    <PlayerStats myTable={this.props.loggedUser} sold={this.state.sold} soldData={this.state.soldData} data={this.state.currentPlayer} teams={this.props.teams} submitBid={this.makeBid} bidHistory={bidHistory} bidDetails={this.state.bidDetails} role={this.state.role} />
                    <TeamSummary data={this.props.detail.leagueUsers} role={this.state.role} />
                </div>
            )
        }
    }

  render() {
    this.getUserRole();

    return (
      <div>
        <h4> Auction Room - {(this.props.detail)?this.props.detail.leagueName: ""}</h4>
        {(!this.state.isActive) ? this.getActionButtons(): ""}
        {!this.state.isActive ? <Button onClick={this.enterAuctionRoom}>Enter Auction</Button> : ""}
        {(this.state.isActive) ? this.getAuctionUI(): <div> Waiting for Moderator to start the auction</div>}
      </div>
    );
  }
}

export default Room;
