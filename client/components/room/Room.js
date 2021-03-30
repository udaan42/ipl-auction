import React from 'react';
import { Button } from 'react-bootstrap';
import { API_URL, JWT_TOKEN, USER_ID } from '../../config/config';
import { getLocalStorage, setLocalStorage } from '../../utils/storageUtil';
import axios from 'axios';
import PlayerStats from './PlayerStats';
import TeamSummary from './TeamSummary';
import ModeratorZone from './ModeratorZone';
import PlayerPopupModal from './PlayerPopupModal';
import _ from 'lodash';
import {
  joinAuctionRoom,
  onJoinRoom,
  messageTestListen,
  startAuction,
  getCurrentPlayerData,
  getAuctionStatus,
  setNextPlayer,
  submitBid,
  getBidUpdates,
  getRoomDetails,
  sellPlayer,
  playerSold,
  getFoldUpdates,
  foldBid,
  disconnect,
} from '../../socket/socket';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'player',
      isActive: false,
      currentPlayer: null,
      auctionSummary: null,
      currentIndex: 0,
      bidDetails: null,
      sold: true,
      soldData: null,
      playersPopUp: false,
      popData: [],
      roomDetail: null,
      joinedRoom: false,
      fold: false,
      foldedArray: [],
    };
  }

  componentDidMount() {
    this.getUserRole();
    this.enterAuctionRoom();

    onJoinRoom((err, data) => {
      console.log(data);
      console.log('Message from the Backend: ');
      this.setState({
        joinedRoom: true,
      });
    });
    messageTestListen((err, data) => {
      console.log('Interval');
      console.log(data);
    });

    getCurrentPlayerData((err, data) => {
      this.setState({
        currentPlayer: data,
        sold: false,
        soldData: null,
      });
    });

    getAuctionStatus((err, data) => {
      this.setState({
        isActive: data.isActive,
      });
    });

    getRoomDetails((err, data) => {
      this.setState({
        isActive: data.isActive,
        currentPlayer: data.currentPlayerInBid,
      });
    });

    getBidUpdates((err, data) => {
      if (data.currentBid == 0) {
        this.setState({
          sold: false,
        });
      } else {
        this.setState({
          bidDetails: data,
        });
      }
    });

    playerSold((err, data) => {
      this.setState({
        bidDetails: null,
        sold: true,
        fold: false,
        soldData: data,
        foldedArray: [],
      });
      this.props.sellPlayer(data);
    });

    getFoldUpdates((err, data) => {
      let tempArray = this.state.foldedArray;
      tempArray.push(data);
      this.setState({
        foldedArray: tempArray,
      });
    });
  }

  componentWillUnmount() {
    this.setState({ joinedRoom: false });
    disconnect();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.roomDetail !== nextProps.detail) {
      const data = {
        userId: getLocalStorage(USER_ID),
        roomId: nextProps.detail.leagueId,
      };

      if (!prevState.joinedRoom) {
        joinAuctionRoom(data);
      }

      let idKey = `currentIndex#${nextProps.detail.leagueId}`;
      let index = getLocalStorage(idKey);

      return {
        roomDetail: nextProps.detail,
        currentIndex: index,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  enterAuctionRoom = () => {
    if (this.props.detail) {
      console.log('ENter auction room');
      const data = {
        userId: getLocalStorage(USER_ID),
        roomId: this.props.detail.leagueId,
      };
      joinAuctionRoom(data);
    }
  };

  bidBtnClick = (val) => {
    let data = {
      userId: getLocalStorage(USER_ID),
      roomId: this.props.detail.leagueId,
      nextBid: val.nextBid,
      playerId: val.playerId,
    };
    submitBid(data);
  };

  makeBid = _.debounce(this.bidBtnClick, 500);

  handleStartButton = () => {
    const data = {
      isActive: true,
      roomId: this.props.detail.leagueId,
    };

    startAuction(data);
  };

  getUserRole = () => {
    let userId = getLocalStorage(USER_ID);

    let user = {};
    if (!_.isEmpty(this.props.detail)) {
      user = _.find(this.props.detail.leagueUsers, ['userId', userId]);
      if (this.state.role != user.leagueRole) {
        this.setState({
          role: user.leagueRole,
        });
      }
    }
  };

  getActionButtons = () => {
    if (this.state.role == 'moderator') {
      if (!this.state.isActive) {
        return <Button onClick={this.handleStartButton}>Start Auction</Button>;
      }
    }
  };

  getPlayer = () => {
    if (this.state.currentIndex < this.props.playerSet.length) {
      const data = {
        roomId: this.props.detail.leagueId,
        player: this.props.playerSet[this.state.currentIndex],
      };
      setNextPlayer(data);
      let idKey = `currentIndex#${this.props.detail.leagueId}`;
      setLocalStorage(idKey, this.state.currentIndex + 1);
      this.setState({
        currentIndex: this.state.currentIndex + 1,
      });
    }
  };

  getNextBag = () => {
    this.props.getNextBag();
    const data = {
      roomId: this.props.detail.leagueId,
      player: null,
    };
    setNextPlayer(data);
    let idKey = `currentIndex#${this.props.detail.leagueId}`;
    setLocalStorage(idKey, 0);
    this.setState({
      currentIndex: 0,
    });
  };

  soldBtnClicked = (val) => {
    let data = {
      roomId: this.props.detail.leagueId,
      nextBid: val.nextBid,
      playerId: val.playerId,
    };
    sellPlayer(data);

    // this.props.sellPlayer();
  };

  handlePopUp = (data) => {
    this.setState({
      playersPopUp: true,
      popData: data,
    });
  };

  foldBtnClicked = () => {
    this.setState({
      fold: true,
    });
    let data = {
      roomId: this.props.detail.leagueId,
      userId: getLocalStorage(USER_ID),
    };
    foldBid(data);
  };

  getAuctionUI = () => {
    const playersRemaining = this.props.playerSet.length - this.state.currentIndex;
    const bidHistory = this.state.bidDetails ? this.state.bidDetails.bidHistory : [];
    if (this.state.role == 'moderator') {
      return (
        <div>
          <ModeratorZone
            sold={this.state.sold}
            submitPlayer={this.getPlayer}
            playersRemaining={playersRemaining}
            nextBag={this.getNextBag}
          />
          <PlayerStats
            myTable={this.props.loggedUser}
            sold={this.state.sold}
            soldData={this.state.soldData}
            sellPlayer={this.soldBtnClicked}
            teams={this.props.teams}
            data={this.state.currentPlayer}
            bidHistory={bidHistory}
            bidDetails={this.state.bidDetails}
            role={this.state.role}
          />
          <TeamSummary
            foldedArray={this.state.foldedArray}
            onOpenPopup={this.handlePopUp}
            data={this.props.detail.leagueUsers}
            role={this.state.role}
          />
        </div>
      );
    } else {
      return (
        <div>
          <PlayerStats
            foldBtn={this.foldBtnClicked}
            fold={this.state.fold}
            myTable={this.props.loggedUser}
            sold={this.state.sold}
            soldData={this.state.soldData}
            data={this.state.currentPlayer}
            teams={this.props.teams}
            submitBid={this.makeBid}
            bidHistory={bidHistory}
            bidDetails={this.state.bidDetails}
            role={this.state.role}
          />
          <TeamSummary
            foldedArray={this.state.foldedArray}
            onOpenPopup={this.handlePopUp}
            data={this.props.detail.leagueUsers}
            role={this.state.role}
          />
        </div>
      );
    }
  };

  closePlayerPopup = () => {
    this.setState({
      playersPopUp: false,
    });
  };

  render() {
    this.getUserRole();

    return (
      <div>
        <h4> Auction Room - {this.props.detail ? this.props.detail.leagueName : ''}</h4>
        {!this.state.isActive ? this.getActionButtons() : ''}
        {/* {!this.state.isActive ? <Button onClick={this.enterAuctionRoom}>Enter Auction</Button> : ""} */}
        {this.state.isActive ? (
          this.getAuctionUI()
        ) : (
          <div> Waiting for Moderator to start the auction</div>
        )}
        <PlayerPopupModal
          data={this.state.popData}
          show={this.state.playersPopUp}
          onExit={this.closePlayerPopup}
        />
      </div>
    );
  }
}

export default Room;
