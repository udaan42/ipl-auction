import React from 'react';
import { Button } from 'react-bootstrap';
import { API_URL, JWT_TOKEN, USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import axios from 'axios';
import PlayerStats from './PlayerStats';
import TeamSummary from './TeamSummary';
import ModeratorZone from './ModeratorZone';
import _ from 'lodash';
import { joinAuctionRoom, messageListen, messageTestListen, startAuction, getCurrentPlayerData, getAuctionStatus, setNextPlayer, submitBid, getBidUpdates } from '../../socket/socket';

class Room extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            role: "moderator",
            isActive: false,
            currentPlayer: null,
            auctionSummary: null,
            currentIndex: 0,
            bidDetails: null
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
                currentPlayer: data
            })
        });

        getAuctionStatus((err, data) => {
            this.setState({
                isActive: data.isActive
            })
        });

        getBidUpdates((err, data) => {
            console.log(data);
        })

    }
  
    enterAuctionRoom = () => {
        if(this.props.detail){
            const data = {
                userId: getLocalStorage(USER_ID),
                room: this.props.detail.leagueId,
            };
            joinAuctionRoom(data);
        }
    };

    makeBid = _.debounce((e) => {
        console.log('Debounced Event:', e);
    }, 500)

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
            userId = "7614773c-aa27-4472-b54d-ef8eb6d54157";
        }else{
            // Mod ID
            userId = "61994eeb-5d4e-48bf-9bd1-bd0fbb7e8125";
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



    getAuctionUI = () => {
        const playersRemaining = this.props.playerSet.length - this.state.currentIndex;
        if(this.state.role=="moderator"){
            return(
                <div>
                    <ModeratorZone submitPlayer={this.getPlayer} playersRemaining={playersRemaining} nextBag={this.getNextBag}/>
                    <PlayerStats sellPlayer={this.props.sellPlayer} data={this.state.currentPlayer} bidHistory={[1,2]}  role={this.state.role} />
                    <TeamSummary data={this.props.detail.leagueUsers} role={this.state.role} />
                </div>
                
            )
        }else{
            return(
                <div>
                    <PlayerStats data={this.state.currentPlayer} submitBid={this.makeBid} bidHistory={[1,2]}  role={this.state.role} />
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
